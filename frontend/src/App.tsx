import React, { useState } from 'react'
import { Input, Layout,  theme } from 'antd'
import type { FC } from 'react'
import List, { DataType } from './components/List'
import { debounce } from 'lodash'
import './App.css'
import Details from './components/Details'

const { Header, Content, Footer } = Layout

const App: FC = () => {
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null)
  const [search, setSearch] = useState('San Diego')

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <div className="headerTitle">RSM Search for Breweries by City</div>
        <div className="search">
          <Input
            style={{ width: 200 }}
            onChange={debounce((e: any) => {
              setSearch(e.target.value)
            }, 1500)}
            placeholder="Search for Brewery"
            defaultValue={search}
          />
        </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ background: colorBgContainer }}></div>
        <List search={search} setRecord={setCurrentRecord} />
        <Details record={currentRecord} setRecord={setCurrentRecord} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <a href={'https://www.openbrewerydb.org'}>Powered by: Open Brewery DB</a> | Developed by: Chris Manjoine 2023
      </Footer>
    </Layout>
  )
}

export default App
