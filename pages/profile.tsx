import styles from '../styles/Settings.module.css'

const Profile = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    Hi Anton
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

export default Profile