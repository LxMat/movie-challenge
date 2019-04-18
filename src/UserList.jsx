
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
        .then(()=>{this.setState({users})})
    }

    render(){
        console.log(this.state.users)
        return(<>
                <div>List of Players:</div>
                {this.state.users.map(user => <div>{user.name + " " + user["Question set "+ this.props.set]}</div>)}
            </>
        )
    }
}