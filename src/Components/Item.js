import React, {Component} from 'react';

class Item extends Component{

    onItemClick(event){

        if (event.target.classList.contains('del-btn')){
            return false;
        }
        this.props.onItemClick(this.props.index);
    }

    render(){

        return(
            <div className={'item-element'}
                 onClick={this.onItemClick.bind(this)}>
                <div className={'name-side'}>
                    <span className={'item-name'}>{this.props.itemName}</span>
                    <span className={'comments-num'}>{this.props.commentsNum}</span>
                </div>
                <button
                    onClick={this.props.removeItem.bind(this, this.props.itemName)}
                    className={'del-btn'}
                >Delete</button>
            </div>
        )
    }
}

export default Item;