
import React, { Component } from 'react';
import FS from './data/FirestoreInterface'

export const NameBox = ({set,score}) => <>
<input onKeyUp={(event)=>event.keyCode===13 ? FS.addUser(event.target.value,set,score):null} />
</>


export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        users: []
        };

        var doc = FS.firestore.collection('users');

        var observer = doc.onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: ${docSnapshot}`);
        this.componentDidMount();
        }, err => {
        console.log(`Encountered error: ${err}`);
        });

    }

    componentDidMount(){
        const users = []
        FS.getUsers()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
              users.push(doc.data())
            });
          })
        .then(()=>{this.setState({users:this.sortList(users)})})
    }

    sortList = (list) => list.sort((a,b)=>{return b["Question set "+ this.props.set] - a["Question set "+ this.props.set]})

    render(){
        let sortedList = this.state.users;
        //let l = sortedList.sort((a,b)=>{return a["Question set "+ this.props.set] - b["Question set "+ this.props.set]});
        console.log(sortedList)

        //let test = [{points:2},{points:30}];
        //console.log(test);
        //console.log(test.sort((a,b)=>a.points-b.points));

        return(<div style={{marginTop:'10px', borderTop:"solid"}}>
                <div>Current scores:</div>
                {this.state.users.map((user) => 
                    user["Question set "+ this.props.set] !=undefined ? 
                    <div key={user.name}>{user.name + ": " + user["Question set "+ this.props.set]}</div>:
                    null)
                }
            </div>
        )
    }
}