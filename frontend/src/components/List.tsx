import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Badge, Button, Table, Tag, Drawer } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
import qs from 'qs'
import { LinkOutlined } from '@ant-design/icons'
import { camel2title } from '../utils/formating'

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>,
  search?: string
}

export interface DataType {
  address_2: string
  address_3: string
  brewery_type: string
  city: string
  country: string
  county_province: string
  created_at: string
  id: string
  latitude: string
  longitude: string
  name: string
  phone: string
  postal_code: string
  state: string
  street: string
  updated_at: string
  website_url: string
}

interface listProp {
  setRecord: Dispatch<SetStateAction<DataType | null>>
  search: string
}
const List: React.FC<listProp> = ({ search, setRecord }) => {
  const [data, setData] = useState<DataType[]>()
  const [loading, setLoading] = useState(false)
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  })

  const showDetails = (record: DataType) => {
    setRecord(record)
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'Details',
      dataIndex: 'id',
      render: (id: string, record) => <Button onClick={() => showDetails(record)}>Details</Button>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name: string, record) => (
        <>
          {name}
          {record.website_url && (
              <a href={record.website_url} target={'blank'}>
                <LinkOutlined />
              </a>
          )}
        </>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'brewery_type',
      render: (type: string, record) => type && <Tag color="volcano">{camel2title(type)} </Tag>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (address: string, record) => (
        <>
          {record.street} <br />
          {record.city}, {record.state} {record.postal_code}
        </>
      ),
    },
  ]
  const calcPageSize = (currentCount:number, perPage:number, page:number) => {
      return page * perPage + (currentCount < perPage ? (currentCount - perPage) : perPage)
  }
  const fetchData = () => {
    setLoading(true)
    fetch(
      `https://api.openbrewerydb.org/breweries?by_city=${search.replace(' ', '_').toLowerCase()}&per_page=${
        tableParams.pagination?.pageSize
      }&page=${tableParams.pagination?.current}`,
    )
      .then((res) => res.json())
      .then((results) => {
        setData(results)
        setLoading(false)
        setTableParams({
          ...tableParams,
          pagination: {
            current: tableParams.pagination?.current,
            pageSize: tableParams.pagination?.pageSize,
            total: calcPageSize(results?.length || 0, tableParams.pagination?.pageSize || 20,tableParams.pagination?.current || 1),
            showSizeChanger: false
          },
          search: search

        })
      })
  }
  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        current: 1,
        pageSize: tableParams.pagination?.pageSize,
        total: calcPageSize(data?.length || 0, tableParams.pagination?.pageSize || 20,tableParams.pagination?.current || 1),
        showSizeChanger: false
      },
      search: search
    })
  },  [search])
  useEffect(() => {
    fetchData()
  }, [JSON.stringify(tableParams)])

  const handleTableChange = (pagination: TablePaginationConfig, sorter: SorterResult<DataType>) => {
    setTableParams({
      pagination,
      ...sorter,
    })

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  )
}

export default List
