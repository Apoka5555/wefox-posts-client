import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createPost, editPost, showPost } from "../../api/api";
import { CreatePost, Post } from "../../api/types";
import Button from "../button/Button";
import InputField from "../input-field/InputField";
import TextAreaField from "../textarea-field/TextAreaField";
import "./PostForm.scss";

interface FormValues {
  title: string;
  content: string;
  latitude: string;
  longitude: string;
  imageUrl: string;
}

interface PostFormProps {
  postId?: number;
}

export default function PostForm({ postId }: PostFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const [postInfo, setPostInfo] = useState<Post | null>(null);

  useEffect(() => {
    if (!postId) {
      return;
    }

    showPost(postId).then((post) => {
      if (post) {
        setPostInfo(post);
      }
    });
  }, [postId]);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    console.log(data);

    const post: CreatePost = {
      title: data.title || "",
      content: data.content || "",
      image_url: data.imageUrl || "",
      lat: data.latitude || "",
      long: data.longitude || "",
    };

    let isSuccess = false;

    if (postId) {
      isSuccess = await editPost(postId, post);
    } else {
      isSuccess = await createPost(post);
    }

    if (isSuccess) {
      navigate("/");
    } else {
      // TODO: handle error
      console.log("Something went wrong");
    }
  };

  if (postId && !postInfo) {
    return null;
  }

  return (
    <div className="form-wrapper">
      <h2 className="form-title">
        {postId ? `Editing post ${postId}` : "Creating new post"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field-wrapper" data-form-line>
          <Controller
            control={control}
            name="title"
            defaultValue={postInfo?.title}
            rules={{
              required: true,
              maxLength: 30,
              pattern: /^[a-zA-Z ._']+$/,
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                type="text"
                name="title"
                id="title"
                label="Title"
                value={value}
                placeholder="Enter the title"
                required
                maxLength={30}
                isError={Boolean(errors.title)}
                patternErrorMessage="Invalid format"
                validationErrorType={errors.title?.type}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="form-field-wrapper" data-form-line>
          <Controller
            control={control}
            name="content"
            defaultValue={postInfo?.content}
            rules={{
              maxLength: 255,
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextAreaField
                label="Content"
                placeholder=""
                required
                id="content"
                name="content"
                value={value}
                rows={4}
                maxLength={255}
                isError={Boolean(errors.content)}
                validationErrorType={errors.content?.type}
                patternErrorMessage="Invalid format"
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="form-field-wrapper" data-form-line>
          <Controller
            control={control}
            name="imageUrl"
            defaultValue={postInfo?.image_url}
            rules={{
              maxLength: 255,
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                type="text"
                name="imageUrl"
                id="imageUrl"
                label="Image url"
                placeholder="Enter the image url"
                value={value}
                maxLength={255}
                isError={Boolean(errors.imageUrl)}
                patternErrorMessage="Invalid format"
                validationErrorType={errors.imageUrl?.type}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="form-field-wrapper" data-form-line>
          <Controller
            control={control}
            name="latitude"
            defaultValue={postInfo?.lat}
            rules={{
              maxLength: 100,
              pattern: /^[+-]?\d+(\.\d+)?$/,
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                type="text"
                name="latitude"
                id="latitude"
                label="Latitude"
                placeholder="Enter the latitude"
                value={value}
                maxLength={100}
                isError={Boolean(errors.latitude)}
                patternErrorMessage="Invalid format"
                validationErrorType={errors.latitude?.type}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="form-field-wrapper" data-form-line>
          <Controller
            control={control}
            name="longitude"
            defaultValue={postInfo?.long}
            rules={{
              maxLength: 100,
              pattern: /^[+-]?\d+(\.\d+)?$/,
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                type="text"
                name="longitude"
                id="longitude"
                label="Longitude"
                placeholder="Enter the longitude"
                value={value}
                maxLength={100}
                isError={Boolean(errors.longitude)}
                patternErrorMessage="Invalid format"
                validationErrorType={errors.longitude?.type}
                onChange={onChange}
              />
            )}
          />
        </div>
        <Button
          text={postId ? "Save changes" : "Create post"}
          onClick={handleSubmit(onSubmit)}
          className="submit-cta"
        />
      </form>
    </div>
  );
}
