import styles from '../../styles/LinkEditor.module.css'
import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const LinkEditor = ({ changeLinkText, changeLinkUrl, id, link }:  any) => {

    const urlChanged = (value: string, id: string) => {
        
        const input = document.getElementById(id) as HTMLInputElement;

        // If the input is less than X characters, return
        if (input.value.length < 5) {
            return;
        }

        input.style.width = value.length + "ch";
    }

    const titleChanged = (value: string, id: string) => {

    }

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: '5px',
    };

    return (
        <>
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles.linkEditorObject}>
                <div className={styles.wrapper} >
                    <div className={styles.title}>
                        <input style={{fontWeight: 'bold', fontSize: '16px'}}  id={id + '_2'} className={styles.input} type="text" defaultValue={link.text} onChange={(e) =>  {urlChanged(e.target.value, id + '_2'); changeLinkText(e.target.value, id - 1)}}   />
                        <Image src="/pencil.png" alt="pencil" width={15} height={15} />
                    </div>
                    <div className={styles.url}>
                        <input id={id + '_1'} className={styles.input} type="text" defaultValue={link.url} onChange={(e) =>  {urlChanged(e.target.value, id + '_1'); changeLinkText(e.target.value, id - 1) } } />
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
            </div>
        </>
    )
}

export default LinkEditor
