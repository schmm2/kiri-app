import React, { useEffect, useState, useContext, useReducer } from "react";
import { getTenantNewestConfigurationVersions } from "graphql/queries";
import { Table } from 'antd';
import { Link, useLocation, useParams } from "react-router-dom";
import TenantContext from "components/TenantContext"
import { renderDate } from 'util/renderDate';
import moment from 'moment';

import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';

export default function MEMConfigurations(props) {

  const selectedTenant = useContext(TenantContext);
  //console.log(selectedTenant);

  const initialState = {
    configurations: [],
    category: null,
    loading: true,
    error: false
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'CLEAR':
        return { ...state, loading: true, configurations: [], error: false }
      case 'SET_CONFIGURATIONS':
        return { ...state, configurations: action.configurations, loading: action.loading }
      case 'ERROR':
        return { ...state, loading: false, error: true }
      default:
        return state
    }
  }


  const [state, dispatch] = useReducer(reducer, initialState);

  const [getTenants, { data }] = useLazyQuery(getTenantNewestConfigurationVersions, {
    fetchPolicy: 'cache-and-network',
    variables: { id: selectedTenant?._id },
    onCompleted: (data) => {
      // console.log(data)
      let configurations = data.tenantById.configurations;
      // console.log(configurations);
      let configurationCollection = [];
      
      configurations.map(configuration => {
        let configurationType = configuration.configurationType;
        // console.log(props.category);
        // console.log(configurationType.category);

        // Todo: find a better way to include this check into grapql query
        if (props.category && (props.category === configurationType.category)) {
          if (configuration.newestActiveConfigurationVersions && configuration.newestActiveConfigurationVersions[0]) {
            let newConfigurationObject = {};
            let configurationVersion = configuration.newestActiveConfigurationVersions[0];

            // build new config object
            // adds pressure to client, makes iterating much easier
            newConfigurationObject.id = configuration._id;
            newConfigurationObject.displayName = configurationVersion.displayName;
            newConfigurationObject.modifiedAt = configurationVersion.graphModifiedAt;
            newConfigurationObject.platform = configurationType.platform;
            newConfigurationObject.type = configurationType.name;

            configurationCollection.push(newConfigurationObject);
          }
        }
      })
      console.log(configurationCollection);
      dispatch({ type: "SET_CONFIGURATIONS", configurations: configurationCollection, loading: false });
    }
  })

  function clear(){
    dispatch({ type: "CLEAR"});
  }

  React.useEffect(() => {
    clear();
    if (!props.category || !selectedTenant) return;
    getTenants();
  }, [props.category]);

  const columns = [
    {
      title: "Name",
      dataIndex: "displayName",
      render: (text, record) => <Link to={props.category + '/' + record.id}>{record.displayName}</Link>
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
    <div className="defaultPage">
      <h1>{props.title}</h1>
      <div>
        <Table rowKey="id" loading={state.loading} pagination={{ pageSize: 25 }} columns={columns} dataSource={state.configurations} onChange={onChange} />
      </div>
    </div>
  );
}