import styles from '../../styles/Edit.module.css'


const Appearance = ({id, setID, setbackgroundCSS, setSelectedImage, setBackgroundType, 
                     backgroundType, setSelectedBackgroundImage, setBackgroundColor, 
                     backgroundColor, profile, setTitle, setDescription}: any) => {
    const changeID = async (e: any) => {
        setID(e.target.value);
    }

    const updateBackground = (type: string) => {
        if (type === 'color') {
            setbackgroundCSS({backgroundColor: backgroundColor});
        } else {
            setbackgroundCSS({backgroundImage: 'url("/background.png")', backgroundSize: '100% 100%'});
        }
    }

    const updateImage = async (e: any) => {
        const params = new FormData();
        params.append('file', e);
        const r = await fetch('/api/upload', {
            method: 'POST',
            body: params
        }).then(res => res.json());

        setSelectedImage(r.data);
    }

    const updateBackgroundImage = async (e: any) => {
        const params = new FormData();
        params.append('file', e);
        const r = await fetch('/api/upload', {
            method: 'POST',
            body: params
        }).then(res => res.json());

        setSelectedBackgroundImage(r.data);

        setbackgroundCSS({backgroundImage: 'url("' + r.data + '")', backgroundSize: '100% 100%'});
    }

    return (
        <>
            <div className={styles.linkInput} >
                    <input type={'text'} defaultValue={id} onChange={changeID} />
                </div>
                
                <div className={styles.picture}>
                    {'Choose Profile Picture '}

                    <label className={styles.fileInput}>
                        <input
                            type="file"
                            name="myImage"
                            onChange={(event: any) => {
                                updateImage(event.target.files[0]);
                            }}
                        />
                        Select Image
                    </label>
                    
                </div>
                <div className={styles.backgroundSelect}>
                    <input type="radio" id="html" name="fav_language" value="color" onClick={(e) => {setBackgroundType('color'); updateBackground('color')}} />
                    <label htmlFor="color">Color</label>
                    <input type="radio" id="html" name="fav_language" value="image" onClick={(e) => {setBackgroundType('image'); updateBackground('image')}} />
                    <label htmlFor="image">Image</label>
                </div>

                {
                    backgroundType === 'color' ? (
                        <input type="color" id="colorpicker" value="#0000ff" onChange={(e) => {setBackgroundColor(e.target.value); updateBackground('color')} }/>
                    ) : (
                        <input
                            type="file"
                            name="myImage"
                            onChange={(event: any) => {
                                updateBackgroundImage(event.target.files[0]);
                            }}
                        />
                    )

                }

                <div className={styles.header}>
                    Title <br />
                    <input className={styles.titleInput} type={'text'} placeholder={'Title'} defaultValue={profile.title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className={styles.header}>
                    Description <br />
                    <textarea className={styles.textarea} onChange={(e) => setDescription(e.target.value)} defaultValue={profile.description} />
                </div>
                
        </>
    )
}

export default Appearance