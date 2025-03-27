import { DeleteOutlined, EditOutlined, LinkOutlined } from '@ant-design/icons';
import { Button, Form, Image, message, Modal, Popconfirm, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Clinicians } from '../../types/types';
import EditClinician from './EditClinician';
import { cliniciansData } from './fakedata';


const CliniciansTable: React.FC = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingClinician, setEditingClinician] = useState<Clinicians | null>(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);


    const handleEdit = (record: Clinicians) => {
        setEditingClinician(record);
        form.setFieldsValue({
            ...record,
            createdAt: dayjs(record.createdAt),
            updatedAt: dayjs(record.updatedAt)
        });
        setIsEditModalOpen(true);
    };

    const handleDelete = (record: Clinicians) => {
        message.success(`${record.name}'s record deleted`);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            console.log('Updated clinician:', values);
            message.success(`${editingClinician?.name}'s details updated successfully`);
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Validation failed:', error);
            message.error('Failed to update clinician');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditModalOpen(false);
        form.resetFields();
    };

    // Fixed columns definition
    const columns: ColumnsType<Clinicians> = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => (
                <Image
                    src={image}
                    width={50}
                    height={50}
                    style={{ borderRadius: '50%' }}
                    alt="Profile"
                    fallback="https://via.placeholder.com/50"
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Practice',
            dataIndex: 'practice',
            key: 'practice',
            render: (practice: string) => practice || 'N/A',
        },
        {
            title: 'Specialities',
            dataIndex: 'specialities',
            key: 'specialities',
            render: (specialities: string[]) => (
                <Space size={[0, 4]} wrap>
                    {specialities?.map(spec => (
                        <Tag key={spec} color="blue">{spec}</Tag>
                    )) || 'N/A'}
                </Space>
            ),
        },
        {
            title: 'Qualifications',
            dataIndex: 'qualifications',
            key: 'qualifications',
            render: (qualifications: string) => qualifications || 'N/A',
        },
        {
            title: 'Portfolio',
            dataIndex: 'portfolioLink',
            key: 'portfolioLink',
            render: (link: string) => link ? (
                <Button
                    type="link"
                    icon={<LinkOutlined />}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                />
            ) : 'N/A',
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        title="Edit"
                    />
                    <Popconfirm
                        title="Are you sure to delete this record?"
                        onConfirm={() => handleDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            danger
                            title="Delete"
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    return (
        <div className='p-4 bg-white rounded-lg shadow-md'>
            <Table<Clinicians>
                columns={columns}
                dataSource={cliniciansData}
                rowKey="id"
                pagination={{ pageSize: 5, showSizeChanger: true }}
                scroll={{ x: 'max-content' }}
                className="custom-table"
            />

            <Modal
                title={<span className="text-xl font-semibold">Edit Clinician: {editingClinician?.name}</span>}
                open={isEditModalOpen}
                onOk={handleSave}
                onCancel={handleCancel}
                width={900}
                confirmLoading={loading}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSave} loading={loading}>
                        Save Changes
                    </Button>,
                ]}
            >
                <EditClinician editingClinician={editingClinician} form={form} />
            </Modal>
        </div>
    );
};

export default CliniciansTable;