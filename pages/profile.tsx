import styles from '../styles/Settings.module.css'
import GetUser from '../scripts/GetUser'
import * as cookie from 'cookie'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Profile = (props: any) => {

    const router = useRouter();

    useEffect(() => {
        if (!props.user) {
            router.push('/login');
        }
    })
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    {props.user?.name}
                </div>  

                <div className={styles.section}>
                    <div className={styles.sectionTitle}>
                        Update Password
                    </div>
                    <input type="password" placeholder="Current Password" className={styles.input} /> <br />
                    <input type="password" placeholder="New Password" className={styles.input} /> <br />
                    <input type="password" placeholder="Confirm New Password" className={styles.input} /> <br />
                    <div className={styles.button}>
                        Update Password
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>
                        My Pages
                    </div>
                    <div className={styles.page}>
                        <div className={styles.pageTitle}>/@anton</div>
                    </div>
                    <div className={styles.button}>
                        New Page
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context: any) {
    // Parse email and token from cookie
    const _cookie = context.req.headers.cookie;

    const parsed = cookie.parse(_cookie || '');
    const email = parsed.email as string;
    const token = parsed.token as string;

    const profile = await GetUser(email, token);

    return {
        props: {user: profile},
    }
}

export default Profile