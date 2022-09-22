import styles from '../../styles/Edit.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

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

    const router = useRouter();

    useEffect(() => {
        setSocial(profile.social);
        setTitle(profile.title);
        setDescription(profile.description);
        setSelectedImage(profile.image);
        setLinks(profile.links);
        setBackgroundType(profile.backgroundType);

        if(profile.backgroundType == 'color') {
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

    const updateLinkObjects = () => {
        let temp: any = [];
        links?.map((link: any, index: number) => {
            temp.push (
                <Link href={link.url} key={'key_link_' + link.text}>
                    <div className={styles.link}>
                        <div className={styles.linkText}>{link.text}</div>
                    </div>
                </Link>
            )
        })

        setLinkObjects(temp);
    }

    const updateImage = async (e: any) => {
        const params = new FormData();
        params.append('file', e);
        const r = await fetch('/api/upload', {
            method: 'POST',
            body: params
        }).then(res => res.json());

        setSelectedImage(r.data);
    }

    const updateBackgroundImage = async (e: any) => {
        const params = new FormData();
        params.append('file', e);
        const r = await fetch('/api/upload', {
            method: 'POST',
            body: params
        }).then(res => res.json());

        setSelectedBackgroundImage(r.data);

        setbackgroundCSS({backgroundImage: 'url("' + r.data + '")', backgroundSize: '100% 100%'});
    }

    

    const changeLinkText = (text: string, index: number) => {
        const tempLink = links;
        tempLink[index].text = text;
        setLinks(tempLink);
        updateLinkObjects();
    }

    const changeLinkUrl = (url: string, index: number) => {
        const tempLink = links;
        tempLink[index].url = url;
        setLinks(tempLink);
        updateLinkObjects();
    }

    const removeLink = (index: number) => {
        const tempLink = links;
        tempLink.splice(index, 1);
        setLinks(tempLink);
        updateLinkObjects();
    }

    const addLink = () => {
        const tempLink = links;
        tempLink.push({text: '', url: ''});
        setLinks(tempLink);
        updateLinkObjects();
    }

    const changeSocial = (media: string, url: string) => {
        const tempMedia = social;
        tempMedia[media] = url;
        setSocial(tempMedia);

        setRender(Math.random().toString());
    }

    const updateProfile = async () => {
        const profile = {
            id: router.query.profile,
            image: selectedImage,
            title: title,
            description: description,
            social: social,
            links: links,
            background: {
                type: backgroundType,
                data: backgroundType == 'color' ? backgroundColor : selectedBackgroundImage
            }
        }

        const params = new URLSearchParams();
        params.append('profile', JSON.stringify(profile));

        const r = await fetch('/api/updatepage', { body: params, method: 'POST' }).then(res => res);
    }

    const updateBackground = (type: string) => {
        if (type === 'color') {
            setbackgroundCSS({backgroundColor: backgroundColor});
        } else {
            setbackgroundCSS({backgroundImage: 'url("/background.png")', backgroundSize: '100% 100%'});
        }
    }

    return (
        <>
        <div className={styles.hidden}>
        {render}
        </div>
        <div className={styles.wrapper}>
            <div className={styles.editContainer}>
                <div className={styles.title}>
                    Edit Page
                </div>
                <div className={styles.button} onClick={updateProfile}>
                    Save Changes
                </div> 

                <div className={styles.picture}>
                    {'Choose Profile Picture '}
                    <input
                        type="file"
                        name="myImage"
                        onChange={(event: any) => {
                            updateImage(event.target.files[0]);
                        }}
                    />
                </div>
                <div className={styles.backgroundSelect}>
                    <input type="radio" id="html" name="fav_language" value="color" onClick={(e) => {setBackgroundType('color'); updateBackground('color')}} />
                    <label htmlFor="color">HTML</label>
                    <input type="radio" id="html" name="fav_language" value="image" onClick={(e) => {setBackgroundType('image'); updateBackground('image')}} />
                    <label htmlFor="image">Image</label>
                </div>

                {
                    backgroundType === 'color' ? (
                        <input type="color" id="colorpicker" value="#0000ff" onChange={(e) => {setBackgroundColor(e.target.value); updateBackground('color')} }/>
                    ) : (
                        <input
                            type="file"
                            name="myImage"
                            onChange={(event: any) => {
                                updateBackgroundImage(event.target.files[0]);
                            }}
                        />
                    )

                }

                <div className={styles.header}>
                    Title <br />
                    <input className={styles.titleInput} type={'text'} placeholder={'Title'} defaultValue={profile.title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className={styles.header}>
                    Description <br />
                    <textarea className={styles.textarea} onChange={(e) => setDescription(e.target.value)} defaultValue={profile.description} />
                </div>
                <div className={styles.header}>
                    Links <br />
                    <div className={styles.links}>
                        {
                            links?.map((link: any, index: number) => {
                                return (
                                    <div className={styles.linkEditor}>
                                        <input className={styles.titleInput} type={'text'} placeholder={'Name'} defaultValue={link.text} onChange={(e) => {changeLinkText(e.target.value, index)}} />
                                        <input className={styles.titleInput} type={'text'} placeholder={'Link'} defaultValue={link.url}  onChange={(e) => {changeLinkUrl(e.target.value, index)}} />
                                        <span className={styles.linkDelete} onClick={(e) => {removeLink(index)}}> x </span>
                                    </div>
                                )
                            })
                        }
                        <div className={styles.addLink} onClick={addLink}>Add link</div>
                    </div>
                </div>
                <div className={styles.header}>
                    Social Media <br />
                    <div className={styles.links}>
                        <div className={styles.linkTitle}>{'Instagram'}</div>  
                        <input className={styles.titleInput} type={'text'} placeholder={'Link'} defaultValue={social?.instagram} onChange={(e) => {changeSocial('instagram', e.target.value)}} />
                    </div>
                    <div className={styles.links}>
                        <div className={styles.linkTitle}>{'Twitter'}</div>  
                        <input className={styles.titleInput} type={'text'} placeholder={'Link'} defaultValue={social?.twitter} onChange={(e) => {changeSocial('twitter', e.target.value)}}/>
                    </div>
                    <div className={styles.links}>
                        <div className={styles.linkTitle}>{'TikTok'}</div>  
                        <input className={styles.titleInput} type={'text'} placeholder={'Link'} defaultValue={social?.tiktok} onChange={(e) => {changeSocial('tiktok', e.target.value)}} />
                    </div>
                    <div className={styles.links}>
                        <div className={styles.linkTitle}>{'YouTube'}</div>  
                        <input className={styles.titleInput} type={'text'} placeholder={'Link'} defaultValue={social?.youtube} onChange={(e) => {changeSocial('youtube', e.target.value)}} />
                    </div>
                </div>
            </div>
            <div className={styles.preview}>
            <div className={styles.container} id='container' style={backgroundCSS}>
                <div className={styles.profile} >
                    <div className={styles.photo}>
                        <Image src={selectedImage || profile.image} alt="profile photo" width={100} height={100} />
                    </div>
                    <div className={styles.title}>
                        {title || profile.title}
                    </div>
                    <div className={styles.description}>
                        {description || profile.description}
                    </div>
                    <div className={styles.social}>

                        {
                            social?.instagram ? <><div className={styles.socialItem}><Image src="/igwhite.png" alt="twitter" width={30} height={30} /></div></> : null
                        }

                        {
                            social?.twitter ? <><div className={styles.socialItem}><Image src="/igwhite.png" alt="twitter" width={30} height={30} /></div></> : null
                        }
                    </div>
                    <div className={styles.links}>
                        {
                            linkObjects
                        }
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export async function getServerSideProps(context: any) {
    const { profile } = context.query

    const params = new URLSearchParams();
    params.append('id', profile);
    const r = await fetch('http://localhost:3000/api/getpage', { body: params, method: 'POST' }).then(res => res.json());
    
    return {
        props: {
            profile: r.profile
        },
    }
}

export default EditProfile