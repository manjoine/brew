import React, { Dispatch, SetStateAction } from 'react'
import type { DataType } from './List'
import Map from './Map'
import { formatPhoneNumber } from 'react-phone-number-input'
import { camel2title } from '../utils/formating'
import { Badge, Button, Card, Col, Drawer, Row } from 'antd'
import { LinkOutlined, PhoneOutlined } from '@ant-design/icons'

interface detailsProps {
  setRecord: Dispatch<SetStateAction<DataType | null>>
  record: DataType | null
}
const Details: React.FC<detailsProps> = ({ record, setRecord, ...props }) => {
  return (
    <Drawer
      width={720}
      destroyOnClose
      placement="right"
      title={`${record?.name} ${record?.brewery_type ? camel2title(record?.brewery_type) : ''}`}
      onClose={() => setRecord(null)}
      visible={!!record}
    >
      {!!record && (
        <Badge.Ribbon text={record?.brewery_type ? camel2title(record?.brewery_type) : ''}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Contact Info" size="small">
                {(record.phone || record.website_url) && (
                  <>
                    {record.phone && (
                      <Button style={{ marginBottom: '10px' }}>
                        <a href={`tel:+1${record.phone}`}>
                          <PhoneOutlined /> {formatPhoneNumber(`+1${record.phone}`)}
                        </a>
                      </Button>
                    )}
                    {record.website_url && (
                      <Button>
                        <a href={record.website_url} target={'blank'}>
                          <LinkOutlined /> Their Website
                        </a>
                      </Button>
                    )}
                  </>
                )}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Address" size="small">
                {record.street}
                <br />
                {record.city}, {record.state} {record.postal_code}
              </Card>
            </Col>
          </Row>
          <Map
            coordinates={{
              lat: parseFloat(record?.latitude || '0'),
              lng: parseFloat(record?.longitude || '0'),
              name: record.name,
            }}
          />
        </Badge.Ribbon>
      )}
    </Drawer>
  )
}

export default Details
