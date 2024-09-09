import React, { useState } from 'react';
import './SegmentPopup.css';
import { addRequest } from '../service'; // Ensure correct path

const schemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
];

const SegmentPopup = ({ onClose }) => {
    const [segmentName, setSegmentName] = useState('');
    const [selectedSchemas, setSelectedSchemas] = useState([]);
    const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);
    const [currentSchema, setCurrentSchema] = useState('');

    const handleAddSchema = () => {
        if (!currentSchema) return;

        const selectedSchema = availableSchemas.find((s) => s.value === currentSchema);

        if (selectedSchema) {
            setSelectedSchemas([...selectedSchemas, selectedSchema]);
            setAvailableSchemas(availableSchemas.filter((s) => s.value !== currentSchema));
            setCurrentSchema('');
        }
    };

    const handleSaveSegment = async () => {
        const data = {
            segment_name: segmentName,
            schema: selectedSchemas.map((s) => ({ [s.value]: s.label })),
        };

        try {
            await addRequest(data);
            alert('Record added successfully!');
            onClose();
        } catch (error) {
            alert('Internal Server Error');
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Save Segment</h2>
                <input
                    type="text"
                    placeholder="Enter segment name"
                    className="input-field"
                    value={segmentName}
                    onChange={(e) => setSegmentName(e.target.value)}
                />

                {selectedSchemas.map((schema, index) => (
                    <select
                        key={index}
                        value={schema.value}
                        className="dropdown"
                        onChange={(e) => {
                            const newSchema = schemaOptions.find((s) => s.value === e.target.value);
                            const updatedSchemas = [...selectedSchemas];
                            updatedSchemas[index] = newSchema;
                            setSelectedSchemas(updatedSchemas);
                            setAvailableSchemas(schemaOptions.filter((s) => !updatedSchemas.includes(s)));
                        }}
                    >
                        <option value={schema.value}>{schema.label}</option>
                    </select>
                ))}

                <select
                    className="dropdown"
                    value={currentSchema}
                    onChange={(e) => setCurrentSchema(e.target.value)}
                >
                    <option value="">Add schema to segment</option>
                    {availableSchemas.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <button className="add-schema-button" onClick={handleAddSchema}>
                    + Add New Schema
                </button>

                <div className="actions">
                    <button className="save-button" onClick={handleSaveSegment}>
                        Save Segment
                    </button>
                    <button className="close-button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SegmentPopup;