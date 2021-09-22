import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.scss'
import * as Yup from 'yup'
import { getCategoryRequestAction, setOnSubmitAction, updateProjectRequest } from '../../../redux/actions/ProjectActions';
import { Editor } from '@tinymce/tinymce-react';
import { Col, Row } from 'antd';

export default function FormEditProject(props) {
    const getCategory = useSelector(state => state.ProjectReducer.category)
    const getProjectEdit = useSelector(state => state.ProjectReducer.projectEdit)

    const dispatch = useDispatch();
    const editorRef = useRef(getProjectEdit.description);
    const formik = useFormik({
        initialValues: {
            id: getProjectEdit.id,
            projectName: getProjectEdit.projectName,
            description: getProjectEdit.description,
            categoryId: getProjectEdit.categoryId,
        },
        validationSchema: Yup.object().shape({
            projectName: Yup.string().required('Project name is required!'),
            categoryId: Yup.string().required('Category is required!'),
        }),
        onSubmit: values => {
            dispatch(updateProjectRequest(formik.values))
        }
    });

    const submitForm = ()=>{
        console.log('formik.values :>> ', formik.values);
    }

    useEffect(() => {
        dispatch(getCategoryRequestAction())
        dispatch(setOnSubmitAction(formik.handleSubmit))
        formik.setValues({
            id: getProjectEdit.id,
            projectName: getProjectEdit.projectName,
            description: getProjectEdit.description,
            categoryId: getProjectEdit.categoryId,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getProjectEdit]);

    const handleChange = (content, editorRef) => {
        formik.values.description = content;
    }

   
    const renderCategory = () => {
        return getCategory.map((item, index) => {
            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
        })
    }

    return (
        <div>
            <form className={styles.form} onSubmit={submitForm}>
                <Row gutter={24}>
                    <Col span={8}>
                        <div>
                            <label className="form-label">Project Id</label>
                            <input type="text" className="form-control" name="id" readOnly
                                onChange={formik.handleChange}
                                value={formik.values.id}
                            />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name="projectName"
                                onChange={formik.handleChange}
                                value={formik.values.projectName}
                            />
                            {formik.errors.projectName && formik.touched.projectName ? <div className="text-danger">{formik.errors.projectName}</div> : null}
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <label className="form-label">Category</label>
                            <select className="form-control" name="categoryId" 
                                onChange={formik.handleChange}
                                value={formik.values.categoryId}
                            >
                              
                                {renderCategory()}
                            </select>
                            {formik.errors.categoryId && formik.touched.categoryId ? <div className="text-danger">{formik.errors.categoryId}</div> : null}
                        </div>
                    </Col>
                </Row>

                <div>
                    <label className="form-label">Description</label>
                    <Editor
                        name="description"
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={formik.values.description}
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
            </form>
        </div>
    )
}
