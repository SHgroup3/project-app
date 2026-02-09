import React, {useState} from 'react';

const useForm = (initialState, finalState) => {
    const [values, setValues] = useState(initialState)
    const [formData, setFormData] = useState(finalState)

    const handleChange = (e) => {
        setValues({
        ...values,
        [e.target.name] : e.target.value
        })
    }
        const handleEvent = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.formData
        })
    }

      return [values, handleChange, formData, handleEvent]
}

export default useForm;
