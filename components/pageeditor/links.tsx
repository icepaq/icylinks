import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Edit.module.css'
import LinkEditor from './LinkEditor';
import { SortableItem } from './SortableItem';
import switchstyles from '../../styles/Switch.module.css';

import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
  } from '@dnd-kit/core';
  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
  } from '@dnd-kit/sortable';


const Links = ({links, setLinkObjects, setLinks, social, setSocial, setRender}: any) => {

    const [items, setItems] = useState<any>([1, 2, 3]);
    const [reOrderOn, setReOrderOn] = useState<boolean>(false);

    useEffect(() => {

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
    
        console.log(links)
        setLinkObjects(temp);
    }
    
    const changeLinkText = (text: string, index: number) => {
        console.log(links, index)
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

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: any) => {
        const {active, over} = event;
        
        if (active.id !== over.id) {
          setItems((items: any) => {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);
            
            return arrayMove(items, oldIndex, newIndex);
          });
        }
    }

    const toggleReOrder = () => {
        setReOrderOn(!reOrderOn);
    }

    return (
        <>
            <div className={styles.linkEditorWrapper}>
            <div className={styles.header}>
                    <div className={styles.toggleReOrder}>
                        Toggle Links 
                        <label className={switchstyles.switch}>
                            <input type={'checkbox'} onClick={toggleReOrder} />
                            <span className={`${switchstyles.slider} ${switchstyles.round}`}></span>
                        </label>
                    </div>
                    {reOrderOn ?
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={items} strategy={verticalListSortingStrategy} >
                                {
                                    links.map((link: any, index: number) => <LinkEditor changeLinkText={changeLinkText} changeLinkUrl={changeLinkUrl} id={index + 1} key={index} link={link} />)
                                }
                            </SortableContext>
                        </DndContext>
                        : 
                        <>
                            {
                                links.map((link: any, index: number) => <LinkEditor changeLinkText={changeLinkText} changeLinkUrl={changeLinkUrl} id={index + 1} key={index} link={link} />)
                            }
                        </>
                    }
                    
                    <div className={styles.links}>
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
                </div>
        </>
    )
}

export default Links