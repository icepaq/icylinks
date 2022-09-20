import styles from '../styles/Profile.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Profile = ({id}: any) => {


    return (
        <>
            <div className={styles.container} id='container' style={{backgroundImage: 'url("/background.png")', backgroundSize: '100vw 100vh'}}>
                <div className={styles.profile} >
                    <div className={styles.photo}>
                        <Image src="/community.png" alt="profile photo" width={100} height={100} />
                    </div>
                    <div className={styles.title}>
                        Hi! I'm Anton
                    </div>
                    <div className={styles.description}>
                        Co-Founder of Icy Links. Software Engineer and user experience designer 
                    </div>
                    <div className={styles.social}>
                        <div className={styles.socialItem}>
                            <Image src="/igwhite.png" alt="twitter" width={30} height={30} />
                        </div>
                        <div className={styles.socialItem}>
                            <Image src="/igwhite.png" alt="twitter" width={30} height={30} />
                        </div>
                    </div>
                    <div className={styles.links}>
                        <Link href="https://github.com/icepaq">
                            <div className={styles.link}>
                                <div className={styles.linkText}>My GitHub Profile</div>
                            </div>
                        </Link>

                        <Link href="https://icylinks.com">
                            <div className={styles.link}>
                           Icy Links Website
                            </div>
                        </Link>
                        <Link href="https://github.com/icepaq">
                            <div className={styles.link}>
                                Learn how to code
                            </div>
                        </Link>
                        <Link href="https://github.com/icepaq">
                            <div className={styles.link}>
                                The future of Web3
                            </div>
                        </Link>
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
            id: id
        },
    }
}

export default Profile