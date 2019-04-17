
import React, { Component } from 'react';
import FS from './data/FirestoreInterface'

export const NameBox = () => <input onChange={(event)=>FS.addName(event.target.value)} />

export default class NameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        names: []
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
        const names = []
        FS.getNames()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
              names.push(doc.data().name)
            });
          })
        .then(()=>{this.setState({names})})
    }

    render(){
        console.log(this.state.names)
        return(<>
                <div>List of Players:</div>
                {this.state.names.map(name => <div>{name}</div>)}
            </>
        )
    }
}