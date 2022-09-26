import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Edit.module.css'
import LinkEditor from './LinkEditor';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const Links = ({links, setLinkObjects, setLinks, social, setSocial, setRender}: any) => {

    const _el = useRef<any>(null);

    const [draggableObjects, setDraggableObjects] = useState<any>([]);

    useEffect(() => {
        const objects = [
            null,
            null
        ]

        setDraggableObjects(objects);
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

    return (
        <>
            <div className={styles.header}>
                    Links <br />
                    <LinkEditor />
                    <LinkEditor />
                    <LinkEditor />
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
                
        </>
    )
}

export default Links