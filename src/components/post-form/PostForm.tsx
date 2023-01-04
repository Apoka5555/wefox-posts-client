import { Controller, SubmitHandler, useForm } from "react-hook-form";
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

export default function PostForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {};

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field-wrapper" data-form-line>
          <Controller
            control={control}
            name="title"
            rules={{
              required: true,
              maxLength: 30,
              pattern: /^[a-zA-Z ._']+$/,
            }}
            render={({ field: { onChange } }) => (
              <InputField
                type="text"
                name="title"
                id="title"
                label="Title"
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
            rules={{
              maxLength: 255,
              pattern: /^[a-zA-Z0-9!@#$%^&*?)//\\|<>(+= .,'"_-]+$/g,
            }}
            render={({ field: { onChange } }) => (
              <TextAreaField
                label="Content"
                placeholder="Please describe the post"
                id="content"
                name="content"
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
            name="latitude"
            rules={{
              required: true,
              maxLength: 100,
              pattern: /^-?\d+(\.\d{1,2})?$/,
            }}
            render={({ field: { onChange } }) => (
              <InputField
                type="text"
                name="latitude"
                id="latitude"
                label="Latitude"
                placeholder="Enter the latitude"
                required
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
            rules={{
              required: true,
              maxLength: 100,
              pattern: /^-?\d+(\.\d{1,2})?$/,
            }}
            render={({ field: { onChange } }) => (
              <InputField
                type="text"
                name="longitude"
                id="longitude"
                label="Longitude"
                placeholder="Enter the longitude"
                required
                maxLength={100}
                isError={Boolean(errors.longitude)}
                patternErrorMessage="Invalid format"
                validationErrorType={errors.longitude?.type}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="form-field-wrapper" data-form-line>
          <Controller
            control={control}
            name="imageUrl"
            rules={{
              required: true,
              maxLength: 255,
              // pattern: /^[a-zA-Z ._']+$/,
            }}
            render={({ field: { onChange } }) => (
              <InputField
                type="text"
                name="imageUrl"
                id="imageUrl"
                label="Image Url"
                placeholder="Enter the image url"
                required
                maxLength={255}
                isError={Boolean(errors.imageUrl)}
                patternErrorMessage="Invalid format"
                validationErrorType={errors.imageUrl?.type}
                onChange={onChange}
              />
            )}
          />
        </div>
        <Button
          text="Save changes"
          onClick={handleSubmit(onSubmit)}
          className="submit-cta"
        />
      </form>
    </div>
  );
}
