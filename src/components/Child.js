import React from 'react'

export default class Child extends React.Component {
    showAlert() {
        alert('Hello World');
    }

    render() {
        return (
            <h1>Hello</h1>
        );
    }
}