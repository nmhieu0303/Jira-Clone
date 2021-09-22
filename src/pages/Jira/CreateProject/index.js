import React, { useEffect, useRef } from 'react'
import styles from './style.module.scss'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { createProjectRequest, getCategoryRequestAction } from '../../../redux/actions/ProjectActions';
import { useFormik } from 'formik';
import * as Yup from 'yup'


export default function CreateProject() {
    const getCategory = useSelector(state => state.ProjectReducer.category)
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const formik = useFormik({
        initialValues: {
            projectName: '',
            description: '',
            categoryId: getCategory[0]?.id,
        },
        validationSchema: Yup.object().shape({
            projectName: Yup.string().required('Project name is required!'),
            categoryId: Yup.string().required('Category is required!'),
        }),
        onSubmit: values => {
            dispatch(createProjectRequest(values))
        },
    });

    useEffect(() => {
        dispatch(getCategoryRequestAction())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (content, editorRef) => {
        formik.values.description = content;
    }
    const renderCategory = () => {
        return getCategory.map((item, index) => {
            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
        })
    }

   
    return (
        <div className="w-100 d-flex justify-content-center">
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <h1 className="text-center mt-3">Create project</h1>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="projectName"
                        onChange={formik.handleChange}
                        value={formik.values.projectName}
                    />
                    {formik.errors.projectName && formik.touched.projectName? <div className="text-danger">{formik.errors.projectName}</div> : null}
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <Editor
                        name="description"
                        onInit={(evt, editor) => editorRef.current = editor}
                        init={{
                            height: 150,
                            menubar: false,
                            statusbar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}

                        onEditorChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-control" name="categoryId" defaultValue={'DEFAULT'}
                        onChange={formik.handleChange}
                        value={formik.values.categoryId}
                    >
                        <option value="DEFAULT" selected disabled>Choose a category ...</option>
                        {renderCategory()}
                    </select>
                    {formik.errors.categoryId && formik.touched.categoryId ? <div className="text-danger">{formik.errors.categoryId}</div> : null}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}
