import styles from '../styles/Profile.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Profile = ({profile}: any) => {


    return (
        <>
            <div className={styles.container} id='container' style={{backgroundImage: 'url("/background.png")', backgroundSize: '100vw 100vh'}}>
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

export default Profile