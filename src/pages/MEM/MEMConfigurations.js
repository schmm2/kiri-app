import React, { useEffect, useState, useContext, useReducer } from "react";
import { API } from "aws-amplify";
import { getTenantNewestConfigurationVersions } from "graphql/custom/getTenantNewestConfigurationVersions";
import { Table } from 'antd';
import { Link, useLocation } from "react-router-dom";
import TenantContext from "components/TenantContext"
import { renderDate } from 'util/renderDate';
import moment from 'moment';

export default function MEMConfigurations(props) {

  const initialState = {
    configurations: [],
    category: null,
    loading: true,
    error: false
  }

  const selectedTenant = useContext(TenantContext);

  function reducer(state, action) {
    switch (action.type) {
      case 'SET_CONFIGURATIONS':
        return { ...state, configurations: action.configurations, category: action.category, loading: false }
      case 'ERROR':
        return { ...state, loading: false, error: true }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchNewestConfigurationVersions() {
    
    try {
      let configurationCollection = [];

      if (selectedTenant && selectedTenant.id) {
        let tenantData = await API.graphql({ query: getTenantNewestConfigurationVersions, variables: { id: selectedTenant.id } });
        let configurations = tenantData.data.getTenant.configurations;
        console.log("before filter");
        console.log(configurations);

        configurations.items.map(configuration => {
          let configurationType = configuration.configurationType;

          // Todo: find a better way to include this check into grapql query
          if (props.category === configurationType.category) {
            if (configuration.configurationVersions.items) {
              let newConfigurationObject = {};
              let configurationVersion = configuration.configurationVersions.items[0];


              // build new config object
              // adds pressure to client, makes iterating much easier
              newConfigurationObject.id = configuration.id;
              newConfigurationObject.displayName = configurationVersion.displayName;
              newConfigurationObject.modifiedAt = configurationVersion.graphModifiedAt;
              newConfigurationObject.platform = configurationType.platform;
              newConfigurationObject.type = configurationType.label;

              configurationCollection.push(newConfigurationObject);
            }
          }
        })
        // console.log(configurationCollection);
      }
      console.log(props.category)
      dispatch({ type: "SET_CONFIGURATIONS", configurations: configurationCollection, category: props.category });

    } catch (err) {
      console.error("error fetching configuration Versions");
      console.log(err);
      dispatch({ type: 'ERROR' })
    }
  }

  useEffect(() => {
    fetchNewestConfigurationVersions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTenant, props.category]);


  const columns = [
    {
      title: "Name",
      dataIndex: "displayName",
      render: (text, record) => <Link to={state.category + '/' + record.id}>{record.displayName}</Link>
    },
    {
      title: "Type",
      dataIndex: ["type"]
    },
    {
      title: "Platform",
      dataIndex: ["platform"]
    },
    {
      title: "Modified at",
      dataIndex: ["modifiedAt"],
      render: (text, record) => renderDate(text),
      sorter: (a, b) => moment(a.modifiedAt).unix() - moment(b.modifiedAt).unix(),
      defaultSortOrder: 'descend'
    }
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      <h1>{props.title}</h1>
      <div>
        <Table rowKey="id" loading={state.loading} pagination={{ pageSize: 25 }} columns={columns} dataSource={state.configurations} onChange={onChange} />
      </div>
    </div>
  );
} 