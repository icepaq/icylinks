import styles from '../styles/Profile.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Profile = ({profile}: any) => {

    const [backgroundCSS, setBackgroundCSS] = useState({});

    useEffect(() => {
        if (profile.background.type === 'image') {
            setBackgroundCSS({
                backgroundImage: `url(${profile.background.data})`,
                backgroundSize: '100% 100%'
            })
        } else {
            setBackgroundCSS({
                backgroundColor: profile.background.data
            })
        }
    }, [])

    return (
        <>
            <div className={styles.container} id='container' style={backgroundCSS}>
                <div className={styles.profile} >
                    <div className={styles.photo}>
                        <Image src={profile.image} alt="profile photo" width={100} height={100} />
                    </div>
                    <div className={styles.title}>
                        {profile.title}
                    </div>
                    <div className={styles.description}>
                        {profile.description}
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
                            profile.links.map((link: any) => {
                                return (
                                    <Link href={link.url} key={'key_link_' + link.text}>
                                        <div className={styles.link}>
                                            <div className={styles.linkText}>{link.text}</div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>

                    <div className={styles.footer}>
                        Powered by <a href="https://icylinks.com">Icy Links</a>
                    </div>
                </div>
                
            </div>
        </>
    )
}


export async function getServerSideProps(context: any) {
    const { id } = context.query

    const params = new URLSearchParams();
    params.append('id', id);
    const r = await fetch('http://localhost:3000/api/getprofile', { body: params, method: 'POST' }).then(res => res.json());
    
    return {
        props: {
            profile: r.profile
        },
    }
}


export default Profile