import React, { useContext, useReducer } from "react";
import { getTenantNewestConfigurationVersions, getNewestConfigurationVersionsOfTenants } from "graphql/queries";
import { Table, Switch } from 'antd';
import { Link } from "react-router-dom";
import TenantContext from "components/TenantContext"
import { renderDate } from 'util/renderDate';
import moment from 'moment';

import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';

export default function MEMConfigurations(props) {

  const selectedTenant = useContext(TenantContext);
  //console.log(selectedTenant);

  const initialState = {
    configurations: [],
    configurationsFiltered: [],
    category: null,
    loading: true,
    error: false,
    filterInfo: {
      state: ["modified", "new"]
    }
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'CLEAR':
        return { ...state, loading: true, configurations: [], error: false }
      case 'SET_CONFIGURATIONS':
        return { ...state, configurations: action.configurations, loading: action.loading }
      case 'ERROR':
        return { ...state, loading: false, error: true }
      case 'SET_FILTERINFO':
        return { ...state, filterInfo: action.filterInfo }
      default:
        return state
    }
  }

  function filterConfigurations(configurations) {
    let configurationCollection = [];

    if (configurations?.length > 0) {
      configurations.map(configuration => {
        let configurationType = configuration.configurationType;
        // console.log(props.category);
        // console.log(configurationType.category);

        // Todo: find a better way to include this check into grapql query
        if (props.category && (props.category === configurationType.category)) {
          if (configuration.newestConfigurationVersions && configuration.newestConfigurationVersions[0]) {
            let newConfigurationObject = {};
            let configurationVersion = configuration.newestConfigurationVersions[0];

            // build new config object
            // adds pressure to client, makes iterating much easier
            newConfigurationObject.id = configuration._id;
            newConfigurationObject.displayName = configurationVersion.displayName;
            newConfigurationObject.modifiedAt = configurationVersion.graphModifiedAt;
            newConfigurationObject.platform = configurationType.platform;
            newConfigurationObject.type = configurationType.name;
            newConfigurationObject.state = configurationVersion.state;

            configurationCollection.push(newConfigurationObject);
          }
        }
      })
    }
    return configurationCollection;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const [getConfigurationsByTenant] = useLazyQuery(getTenantNewestConfigurationVersions, {
    fetchPolicy: 'cache-and-network',
    variables: { id: selectedTenant?._id },
    onCompleted: (data) => {
      console.log(data)
      let configurations = data.tenantById.configurations;
      let filteredConfigurations = filterConfigurations(configurations);
      dispatch({ type: "SET_CONFIGURATIONS", configurations: filteredConfigurations, loading: false });
    },
    onError: (error) => {
      console.log(error)
      dispatch({ type: "ERROR" });
    }
  })

  const [getConfigurations] = useLazyQuery(getNewestConfigurationVersionsOfTenants, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      console.log(data)
      let configurations = data.tenantMany.configurations;
      let filteredConfigurations = filterConfigurations(configurations);
      dispatch({ type: "SET_CONFIGURATIONS", configurations: filteredConfigurations, loading: false });
    },
    onError: (error) => {
      console.log(error)
      dispatch({ type: "ERROR" });
    }
  })

  function clear() {
    dispatch({ type: "CLEAR" });
  }

  React.useEffect(() => {
    clear();
    if (!props.category) return;
    if (selectedTenant) {
      getConfigurationsByTenant();
    } else {
      getConfigurations();
    }
  }, [props.category]);

  const columns = [
    {
      title: "Name",
      dataIndex: "displayName",
      render: (text, record) => <Link to={props.category + '/' + record.id}>{record.displayName}</Link>,
      visible: true
    },
    {
      title: "Type",
      dataIndex: ["type"],
      visible: true
    },
    {
      title: "Platform",
      dataIndex: ["platform"],
      visible: true
    },
    {
      title: "Modified at",
      dataIndex: ["modifiedAt"],
      render: (text, record) => renderDate(text),
      sorter: (a, b) => moment(a.modifiedAt).unix() - moment(b.modifiedAt).unix(),
      defaultSortOrder: 'descend',
      visible: true
    },
    {
      title: "State",
      dataIndex: ["state"],
      visible: false,
      filters: [
        { text: 'modified', value: 'modified' },
        { text: 'deleted', value: 'deleted' },
        { text: 'new', value: 'new' },
      ],
      filteredValue: state.filterInfo.state || null,
      onFilter: (value, record) => record.state.includes(value),

    },
  ];

  const renderBody = (props, columns) => {
    return (
      <tr className={props.className}>
        {columns.map((item, idx) => {
          if (item.visible) {
            return props.children[idx]
          }
        })}
      </tr>
    )
  }

  const renderHeader = (props, columns) => {
    return (
      <tr>
        {columns.map((item, idx) => {
          if (item.visible)
            return props.children[idx];
        })}
      </tr>
    )
  }

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  function switchShowDeleted(checked) {
    console.log("show delted:" + checked);
    let filterInfo = {
      state: ["modified", "new"]
    }
    if (checked) {
      filterInfo.state.push("deleted");
    }
    dispatch({ type: "SET_FILTERINFO", filterInfo });
  }

  return (
    <div className="defaultPage">
      <h1>{props.title}</h1>
      <div>
        <Table rowKey="id"
          loading={state.loading}
          pagination={{ pageSize: 25 }}
          columns={columns}
          dataSource={state.configurations}
          onChange={onChange}
          components={{
            header: {
              row: (props) => renderHeader(props, columns)
            },
            body: {
              row: (props) => renderBody(props, columns)
            }
          }}
        />
        <div>
          <span>Show Deleted<Switch onChange={switchShowDeleted} /></span>
        </div>
      </div>
    </div>
  );
}