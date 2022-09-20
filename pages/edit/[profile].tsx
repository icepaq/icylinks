import styles from '../../styles/Edit.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const EditProfile = ({profile}: any) => {

    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [links, setLinks] = useState<any>();
    const [linkObjects, setLinkObjects] = useState<any>([]);

    useEffect(() => {
        setLinks(profile.links);
        console.log(links)

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

    return (
        <>
        <div className={styles.wrapper}>
            <div className={styles.editContainer}>
                <div className={styles.title}>
                    Edit Page
                </div>

                <div className={styles.picture}>
                    {'Choose Picture '}
                    <input
                        type="file"
                        name="myImage"
                        onChange={(event: any) => {
                            updateImage(event.target.files[0]);
                        }}
                    />
                </div>

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
            </div>
            <div className={styles.preview}>
            <div className={styles.container} id='container' style={{backgroundImage: 'url("/background.png")', backgroundSize: '100% 100%'}}>
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
                            profile.social.instagram ? <><div className={styles.socialItem}><Image src="/igwhite.png" alt="twitter" width={30} height={30} /></div></> : null
                        }

                        {
                            profile.social.twitter ? <><div className={styles.socialItem}><Image src="/twitterwhite.png" alt="twitter" width={30} height={30} /></div></> : null
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

export function getServerSideProps(context: any) {
    const { id } = context.query
    return {
        props: {
            profile: {
                image: 'https://avatars.githubusercontent.com/u/62949848?v=4',
                title: 'Hi! I\'m Anton',
                description: 'Co-Founder of Icy Links. Software Engineer and user experience designer',
                social: {
                    instagram: 'https://www.instagram.com/antonr_1/',
                },
                links: [
                    { text: 'My GitHub Profile', url: 'https://githu.com/icepaq' },
                    { text: 'Icy Links Website', url: 'https://icylinks.com' }
                ]
            }
        },
    }
}

export default EditProfile