import React, {Component} from 'react';
import { List, Avatar, Button, Checkbox, Spin } from 'antd';
import satellite from "../assets/images/satellite.svg";

class SatelliteList extends Component {
    constructor(){
        super();
        this.state = {
            selected: [],
            isLoad: false
        };
    }

    onChange = e => {
        const { dataInfo, checked } = e.target;
        const { selected } = this.state;
        const list = this.addOrRemove(dataInfo, checked, selected);
        this.setState({ selected: list })
    }

    addOrRemove = (item, status, list) => {
        const found = list.some( entry => entry.satid === item.satid);
        if(status && !found){
            list = [...list, item]
        }

        if(!status && found){
            list = list.filter( entry => {
                return entry.satid !== item.satid;
            });
        }
        return list;
    }

    onShowSatMap = () => {
        // pass the selected sat list to Main.js
        this.props.onShowMap(this.state.selected);
    }

    render() {
        // satellites information is in satInfo.above
        // above:[{
        // intDesignator: "2020-001D"
        // launchDate: "2020-01-07"
        // satalt: 555.4707
        // satid: 44917
        // satlat: 52.9557
        // satlng: -7.5326
        // satname: "STARLINK-1098"
        // }]

        // this.props has three objects: satInfor, isLoad, and onShowMap
        const satList = this.props.satInfo ? this.props.satInfo.above : [];
        const { isLoad } = this.props;
        const { selected } = this.state;

        return (
            <div className="sat-list-box">
                <Button className="sat-list-btn"
                        size="large"
                        disabled={ selected.length === 0} // disable Ant Button when there is no satellite selected
                        onClick={this.onShowSatMap}
                >Track on the map</Button>
                <hr/>

                {   // show loading spin when this.props.satInfo is null
                    isLoad ?
                        <div className="spin-box">
                            <Spin tip="Loading..." size="large" />  
                        </div>
                        :
                        <List
                            className="sat-list"
                            itemLayout="horizontal"
                            size="small"
                            dataSource={satList}
                            renderItem={item => (
                                <List.Item
                                    // directly give item to Checkbox. here item is not a props to Checkbox
                                    // dataInfo will be used in onChange
                                    actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]} 
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar size={50} src={satellite} />}
                                        title={<p>{item.satname}</p>}
                                        description={`Launch Date: ${item.launchDate}`}
                                    />

                                </List.Item>
                            )}
                        />
                }
            </div>
        );
    }
}

export default SatelliteList;
