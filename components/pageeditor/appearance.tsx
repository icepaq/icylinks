import styles from "../../styles/Edit.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SliderPicker } from "react-color";

const Appearance = ({
  id,
  setID,
  setbackgroundCSS,
  setSelectedImage,
  setBackgroundType,
  backgroundType,
  setSelectedBackgroundImage,
  setBackgroundColor,
  backgroundColor,
  profile,
  setTitle,
  setDescription,
  selectedImage,
  selectedBackgroundImage,
}: any) => {
  const changeID = async (e: any) => {
    setID(e.target.value);
  };

  useEffect(() => {
    console.log(selectedBackgroundImage);
  });

  const updateBackground = (type: string) => {
    if (type === "color") {
      setbackgroundCSS({ backgroundColor: backgroundColor });
    } else {
      setbackgroundCSS({
        backgroundImage: `url("${selectedBackgroundImage}")`,
        backgroundSize: "100% 100%",
      });
    }
  };

  const updateImage = async (e: any) => {
    const params = new FormData();
    params.append("file", e);
    const r = await fetch("/api/upload", {
      method: "POST",
      body: params,
    }).then((res) => res.json());

    setSelectedImage(r.data);
  };

  const updateBackgroundImage = async (e: any) => {
    const params = new FormData();
    params.append("file", e);
    const r = await fetch("/api/upload", {
      method: "POST",
      body: params,
    }).then((res) => res.json());

    setSelectedBackgroundImage(r.data);

    setbackgroundCSS({
      backgroundImage: 'url("' + r.data + '")',
      backgroundSize: "100% 100%",
    });
  };

  return (
    <>
      <div className={styles.picture}>
        <div className={styles.sectionTitle}>Profile</div>
        <div className={styles.pictureContainer}>
          <span className={styles.circleImage}>
            {selectedImage ? (
              <Image src={selectedImage} width={100} height={100} />
            ) : null}
          </span>
          <span className={styles.photoActions}>
            <div>
              <label className={styles.greyButton}>
                <input
                  className={styles.greyButton}
                  type="file"
                  name="myImage"
                  onChange={(event: any) => {
                    updateImage(event.target.files[0]);
                  }}
                />
                New Image
              </label>
            </div>
            <div className={styles.greyButton}>Remove Image</div>
          </span>
        </div>
      </div>

      <div className={styles.header}>
        <input
          className={styles.titleInput}
          type={"text"}
          placeholder={"Title"}
          defaultValue={profile.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.linkInput}>
        <input
          className={styles.titleInput}
          type={"text"}
          placeholder={"Title"}
          defaultValue={id}
          onChange={changeID}
        />
      </div>
      <textarea
        className={styles.textarea}
        onChange={(e) => setDescription(e.target.value)}
        defaultValue={profile.description}
      />

      <div className={styles.sectionTitle}>Background</div>
      <div className={styles.backgroundSelect}>
        <span className={styles.backgroundSelector}>
          <input
            className={styles.input}
            type="radio"
            id="html"
            name="fav_language"
            value="color"
            onClick={(e) => {
              setBackgroundType("color");
              updateBackground("color");
            }}
          />
          <label htmlFor="color">Color</label>
        </span>

        <span className={styles.backgroundSelector}>
          <input
            className={styles.input}
            type="radio"
            id="html"
            name="fav_language"
            value="image"
            onClick={(e) => {
              setBackgroundType("image");
              updateBackground("image");
            }}
          />
          <label htmlFor="image">Image</label>
        </span>
      </div>

      {backgroundType === "color" ? (
        <div className={styles.backgroundColorSelecter}>
          <SliderPicker
            color={backgroundColor}
            onChange={(color) => {
              setBackgroundColor(color.hex);
              updateBackground("color");
            }}
          />
        </div>
      ) : (
        <div>
          <label className={styles.greyButton}>
            <input
              className={styles.greyButton}
              type="file"
              name="myImage"
              onChange={(event: any) => {
                updateBackgroundImage(event.target.files[0]);
                updateBackground("image");
              }}
            />
            New Image
          </label>
        </div>
      )}

      <div className={styles.chooseAnImage}>
        <div className={styles.sectionTitleSmall}>
          Or Choose an Existing Background
        </div>
        <div className={styles.backgroundImages}>
          <div className={styles.backgroundImage} />
          <div className={styles.backgroundImage} />
          <div className={styles.backgroundImage} />
        </div>
      </div>

      <div className={styles.buttonStyling}>
        <div className={styles.sectionTitleSmall}>Button Styling</div>
        <div className={styles.colorSelectorWrapper}>
          <div className={styles.colorSelector}></div>
          Background Color
        </div>
        <div className={styles.colorSelectorWrapper}>
          <div className={styles.colorSelector}></div>
          Text Color
        </div>
        <div className={styles.colorSelectorWrapper}>
          <div>
          <input
            type="range"
            min="1"
            max="100"
            defaultValue={100}
            className={styles.slider}
          />
          </div>
          Transaparency
        </div>
      </div>
    </>
  );
};

export default Appearance;
