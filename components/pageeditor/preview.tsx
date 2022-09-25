import styles from '../../styles/Edit.module.css'
import Image from 'next/image'

const Preview = ({backgroundCSS, selectedImage, profile, title, description, social, linkObjects, id}: any) => {
    return (
        <>
            <div className={styles.preview}>
                <div className={styles.menu}>
                    <div className={styles.url}>
                        https://icyl.ink/{id}
                    </div>
                </div>
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
        </>
    )
}

export default Preview