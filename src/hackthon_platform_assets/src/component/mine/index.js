import React, { Component } from 'react';
export default class Index extends Component {

    constructor(props){
        super(props);
        this.state = {
        	cur: 0,
            tabItem : [
                {name: '消息'},
                {name: '通讯录'},
                {name: '我的群组'}
            ],
            ComponentTab: [
                Message,
                AddressBook,
                MyGroups
            ]
        }
    }
    render() {
        return(
            <div className="content">
             
                <div className="tabs-title">
                    <ul>
                      {
                        this.state.tabItem.map((item,index)=>
                         <li onClick={() => this.tabClick(index)}>{item.name}</li>
                        )
                      } 
                    </ul>
                </div>

                <div className="tabs-content">
                     {
				      <section>
				        { this.changeComponent(this.state.cur) }
				      </section>
				      
				    }
                </div>
            </div>
        );
    }
    tabClick(index){
    	this.setState({
    		cur: index
    	})
    }
    
    changeComponent(index) {
    	switch (index) {
		  case 0:
		    return  <Message/>;
		  case 1:
		    return  <AddressBook/>;
		  case 2:
		    return  <MyGroups/>;
		  default:
		    break;
		}  
    }
}