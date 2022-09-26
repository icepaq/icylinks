import styles from '../../styles/LinkEditor.module.css'
import Image from 'next/image';

const LinkEditor = () => {

    const urlChanged = (value: string, id: string) => {
        const input = document.getElementById(id) as HTMLInputElement;
        input.style.width = value.length + "ch";
    }

    const titleChanged = (value: string, id: string) => {

    }

    return (
        <>
        <li draggable={true} >
            <div className={styles.wrapper} >
                <div className={styles.title}>
                    <input style={{fontWeight: 'bold', fontSize: '16px'}}  id='2' className={styles.input} type="text" defaultValue={"https://google.com"} onChange={(e) =>  urlChanged(e.target.value, '2')} />
                    <Image src="/pencil.png" alt="pencil" width={15} height={15} />
                </div>
                <div className={styles.url}>
                    <input id='1' className={styles.input} type="text" defaultValue={"https://google.com"} onChange={(e) =>  urlChanged(e.target.value, '1')} />
                    <Image src="/pencil.png" alt="pencil" width={15} height={15} />
                </div>
                <div className={styles.optionRow}>
                    <div className={styles.option}>
                        <Image src="/burst.png" alt="link" width={25} height={25} />
                    </div>
                    <div className={styles.option}>
                        <label >
                            <input className={styles.colorInput}  type={'color'} />
                            <div className={styles.color}></div>
                        </label>

                    </div>
                </div>
            </div>
        </li>
        </>
    )
}

export default LinkEditor
