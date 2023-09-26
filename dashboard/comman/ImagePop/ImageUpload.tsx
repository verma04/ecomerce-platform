import React, { useState } from "react";

import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";

import ErrorIcon from "@mui/icons-material/Error";
import Skeleton from "react-loading-skeleton";

import { Box, Button, TextField } from "@mui/material";
import { addImage, getAllImages } from "@/grapqhl/actions/assets";
import { imageInput } from "@/types/type";
import { LoadingButton } from "@mui/lab";

const ImageUpload = ({ setstate, set }: any) => {
  const [mutate, { data: data1, loading: load }] = addImage();
  const { loading, data, error } = getAllImages();

  const defaultImg = "/20211223-6sle4-assa.png";

  const [active, setActive] = useState(null);
  const [img, setImg] = useState(null);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [send, sendImg] = useState({
    path: "/20211223-6sle4-assa.png",
  });

  const onChange = async (e) => {
    await setImage(e.target.files[0]);
    await setImg(URL.createObjectURL(e.target.files[0]));
    const lastDot = await e.target.files[0].name.lastIndexOf(".");
    await setImageName(e.target.files[0].name.substring(0, lastDot));
  };

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<imageInput>();
  const onSubmit: SubmitHandler<imageInput> = (data) => {
    const set = {
      ...data,
      file: image,
    };

    mutate({
      variables: set,
    });

    // mutate(set);
  };

  console.log(data1?.addImage);
  const senddata = () => {
    if (send.url === defaultImg) {
    } else {
      set(send);
    }
  };

  return (
    <Box
      sx={{ width: "100%", height: "100vh", border: "1px solid red" }}
      className="set"
    >
      {data1 && data1.addImage && set(data1?.addImage)}

      <Box width={"100%"} height="100vh" className="modal-image">
        <span
          onClick={() => setstate(false)}
          style={{
            fontSize: "2rem",
          }}
          className="close"
        >
          &times;
        </span>
        <div className="modal-top">
          <div className="modal-top-right">
            <h2
              style={{
                marginBottom: "1.2rem",
                fontWeight: "1000",
              }}
            >
              Media Libaray
            </h2>
          </div>

          <div className="modal-top-left">
            <h2 onClick={() => setActive(!active)} id={active ? "set" : ""}>
              Upload Image
            </h2>

            <h2 onClick={() => setActive(!active)} id={active ? "" : "set"}>
              Image Gallery
            </h2>
          </div>
        </div>
        {active ? (
          <div className="modal-image-1">
            {img ? (
              <div className="conatiner">
                <div className="wrapper-img">
                  <img
                    src={`${img}`}
                    layout="fill"
                    alt="logo"
                    objectFit="contain"
                  ></img>
                </div>
                <form
                  style={{
                    width: "30%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    width={"90%"}
                    height={"70%"}
                  >
                    <TextField
                      {...register("alt", {
                        required: "required",
                      })}
                      error={errors.alt && true}
                      fullWidth
                      id="outlined-error-helper-text"
                      label="Alt"
                      sx={{ fontSize: "2rem" }}
                      helperText={errors.alt && errors.alt.message}
                    />
                    <TextField
                      {...register("description", {
                        required: "required",
                      })}
                      error={errors.description && true}
                      fullWidth
                      id="outlined-error-helper-text"
                      label=" description"
                      sx={{ fontSize: "2rem" }}
                      helperText={
                        errors.description && errors.description.message
                      }
                    />
                    <TextField
                      {...register("caption", {
                        required: "required",
                      })}
                      fullWidth
                      id="outlined-error-helper-text"
                      label="caption"
                      sx={{ fontSize: "2rem" }}
                      defaultValue={image?.caption}
                      helperText={errors.caption && errors.caption.message}
                    />

                    {load ? (
                      <LoadingButton
                        loading
                        variant="outlined"
                        sx={{
                          width: "100%",
                          marginTop: "1rem",
                          height: "3rem",
                        }}
                      >
                        Fetch data
                      </LoadingButton>
                    ) : (
                      <Button
                        type="submit"
                        sx={{
                          width: "100%",
                          marginTop: "1rem",
                          height: "3rem",
                        }}
                        variant="contained"
                      >
                        Add
                      </Button>
                    )}
                  </Box>
                </form>
              </div>
            ) : (
              <>
                <input
                  className="image"
                  type="file"
                  accept="image/*"
                  onChange={onChange}
                  id="file-input"
                  style={{
                    display: "none",
                  }}
                />
                <label htmlFor="file-input">
                  <div
                    style={{
                      width: "10rem",
                      position: "relative",
                      height: "10rem",
                      cursor: "pointer",
                    }}
                    className="wrapper-img"
                  >
                    <Image
                      src={"/upload.png"}
                      layout="fill"
                      alt="logo"
                      priority
                      objectFit="contain"
                    ></Image>
                  </div>
                </label>
                <p style={{ textAlign: "center" }}>
                  Rename the image before uploading , according to section
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="modal-image-1">
            <div className="conatiner">
              {loading ? (
                <div className="wrapper-img">
                  <div className="wrapper-images">
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                  </div>
                </div>
              ) : (
                <div key={set.imgName} className="wrapper-img">
                  {data?.getAllImages.map((set) => (
                    <div
                      onClick={() => sendImg(set)}
                      id={send.url === set.url ? "active" : ""}
                      key={set.imgName}
                      className="wrapper-images"
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={`${process.env.NEXT_PUBLIC_IMG}${set?.url}`}
                        alt={`${process.env.NEXT_PUBLIC_IMG}${set?.alt}`}
                        objectFit="contain"
                      />
                    </div>
                  ))}
                </div>
              )}
              <form className="form-upload" onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="head">
                  <h2> Add Image </h2>
                </div>
                <div
                  style={{
                    height: "30%",
                  }}
                  className="wrapper-img"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    priority={true}
                    src={`${process.env.NEXT_PUBLIC_IMG}${send?.url}`}
                  />
                </div>
                <div className="btn">
                  <Button
                    variant="outlined"
                    onClick={() => senddata()}
                    id="submit"
                    type="button"
                  >
                    Add
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;
