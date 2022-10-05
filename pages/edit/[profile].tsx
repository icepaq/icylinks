import styles from '../../styles/Edit.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Links from '../../components/pageeditor/links'
import Appearance from '../../components/pageeditor/appearance'
import Preview from '../../components/pageeditor/preview'

const EditProfile = ({profile}: any) => {

    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [selectedBackgroundImage, setSelectedBackgroundImage] = useState<any>(null);
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [links, setLinks] = useState<any>();
    const [linkObjects, setLinkObjects] = useState<any>([]);
    const [social, setSocial] = useState<any>();
    const [render, setRender] = useState<string>('');
    const [backgroundType, setBackgroundType] = useState<string>('color');
    const [backgroundColor, setBackgroundColor] = useState<string>('#000000');
    const [backgroundCSS, setbackgroundCSS] = useState<any>({backgroundImage: 'url("/background.png")', backgroundSize: '100% 100%'});
    const [id, setID] = useState<string>('');
    const [selectedScreen, setSelectedScreen] = useState<string>('vibe');

    const router = useRouter();

    useEffect(() => {
        setSocial(profile.social);
        setTitle(profile.title);
        setDescription(profile.description);
        setSelectedImage(profile.image);
        setLinks(profile.links);
        setBackgroundType(profile.backgroundType);
        setID(profile.id);

        if(profile.background.type == 'color') {
            setBackgroundColor(profile.background.data);
            setbackgroundCSS({backgroundColor: profile.background.data});
        } else {
            setSelectedBackgroundImage(profile.background.data);
            setbackgroundCSS({backgroundImage: `url("${profile.background.data}")`, backgroundSize: '100% 100%'});
        }

        let temp: any = [];
        profile.links?.map((link: any, index: number) => {
            temp.push (
                <Link href={link.url} key={'key_link_' + link.text}>
                    <div className={styles.link}>
                        <div className={styles.linkText}>{link.text}</div>
                    </div>
                </Link>
            )
        })
        setLinkObjects(temp);
    }, [])

    const updateProfile = async () => {
        const _profile = {
            id: id,
            oldID: profile.id,
            title: document.getElementById('title')?.innerHTML,
            image: selectedImage,
            description: description,
            social: social,
            links: links,
            background: {
                type: backgroundType,
                data: backgroundType == 'color' ? backgroundColor : selectedBackgroundImage
            },
        }

        const params = new URLSearchParams();
        params.append('profile', JSON.stringify(_profile));

        const r = await fetch('/api/updatepage', { body: params, method: 'POST' }).then(res => res);
    }


    return (
        <>
        <div className={styles.hidden}>
        {render}
        </div>
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
                x
            </div>
            <div className={styles.editContainer}>
                <div className={styles.menu}>
                    <div className={styles.menuItem} onClick={() => {setSelectedScreen('links')}}>
                        Links
                    </div>
                    <div className={styles.menuItem} onClick={() => {setSelectedScreen('vibe')}}>
                        Vibe
                    </div>
                    <div className={styles.menuItem}>
                        Analytics
                    </div>
                </div>
                <div className={styles.padding}>
                <div className={styles.title}>
                    {/* {selectedScreen == 'links' ? 'Links' : 'Vibe'} */}
                </div>
                <div className={styles.button} onClick={updateProfile}>
                    Save Changes
                </div> 
                {
                    selectedScreen == 'links' ? 
                        <Links links={links} setLinkObjects={setLinkObjects} setLinks={setLinks} social={social} setSocial={setSocial} setRender={setRender} /> 
                        : 
                        (selectedScreen == 'vibe'?  
                            <Appearance selectedImage={selectedImage} id={id} setID={setID} setbackgroundCSS={setbackgroundCSS} setSelectedImage={setSelectedImage} 
                                        setBackgroundType={setBackgroundType} backgroundType={backgroundType} 
                                        setSelectedBackgroundImage={setSelectedBackgroundImage} backgroundColor={backgroundColor} 
                                        setBackgroundColor={setBackgroundColor} profile={profile} setTitle={setTitle} 
                                        setDescription={setDescription} setSocial={setSocial} />
                        : null)
                }
                </div>
            </div>
            <Preview backgroundCSS={backgroundCSS} selectedImage={selectedImage} profile={profile} title={title} description={description} social={social} linkObjects={linkObjects} id={id} />
        </div>
        </>
    )
}

export async function getServerSideProps(context: any) {
    const { profile } = context.query

    const params = new URLSearchParams();
    params.append('id', profile);
    const r = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/getpage', { body: params, method: 'POST' }).then(res => res.json());
    
    return {
        props: {
            profile: r.profile
        },
    }
}

export default EditProfile