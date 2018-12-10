import React, {Component} from 'react';
import Item from "./Item";
import Comment from "./Comment";

class MainContent extends Component{

    constructor(){
        super();

        this.state = {
            inputVal: '',
            commentInputVal: '',
            itemsArr: [],
            actItemIndex: 0
        }
    }

    onInputChange(inputType, event){

        let newVal = event.target.value;

        inputType === 'item' ?

        this.setState({
            inputVal: newVal
        }) :

            this.setState({
                commentInputVal: newVal
            })
    }


    addRemoveItem(itemIndex){

        let addEl = {
            name: this.state.inputVal,
            comments: []
        };

        let itemsArr = this.state.itemsArr;
        let delIndex;

        if (arguments.length > 1) {

            this.setState({
                itemsArr: this.state.itemsArr.filter((el) => {
                    return el.name !== itemIndex
                })
            });

            for (let i = 0; i < itemsArr.length; i++){
                let item = itemsArr[i];
                item.name === itemIndex && (delIndex = i);
            }

            (delIndex === (itemsArr.length - 1) && (delIndex > 0) ) &&
                this.setState({
                    actItemIndex: delIndex -1
                });

        } else {

            let itemExist = [];

            for(let i = 0; i < itemsArr.length; i++){
                let item = itemsArr[i].name;
                (item === this.state.inputVal) && itemExist.push(item);
            }

            itemExist.length ? alert(`Item with name ${this.state.inputVal} is already exist! `) :

                this.setState({
                    itemsArr: [
                        ...this.state.itemsArr, addEl
                    ],
                    inputVal: ''
                })
        }
    }

    onItemClick(itemIndex){
        this.setState({
            actItemIndex: itemIndex,
        });
    }

    keyDownHandler(e){

        let itemsArr = this.state.itemsArr;

        if (e.code === 'Enter' && e.ctrlKey) {

            for(let i = 0; i < itemsArr.length; i++){

                if (i === this.state.actItemIndex){
                    itemsArr[i].comments.push(this.state.commentInputVal);
                }
            }

            this.setState({
                itemsArr: itemsArr,
                commentInputVal: ''
            })
        }

    }

    componentWillMount(){
        localStorage.getItem('itemsData') && this.setState({
            itemsArr: JSON.parse(localStorage.getItem('itemsData'))
        });
        console.log('WillMount');
    }

    componentDidMount(){
        document.addEventListener('keypress', this.keyDownHandler.bind(this));
        console.log('didmount');
    }

    componentWillUnmount(){
        document.removeEventListener('keypress',this.keyDownHandler.bind(this));
    }

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem('itemsData', JSON.stringify(nextState.itemsArr));
        console.log('WillUpdate');

    }

    render(){

        let items = [],
            commentsArr = [],
            itemsArr = this.state.itemsArr,
            actItem = itemsArr[this.state.actItemIndex];

        for(let i = 0; i < itemsArr.length; i++){

            let item = itemsArr[i];

            items.push(
                <Item
                    key={`item-${i}`}
                    index={i}
                    itemName={item.name}
                    commentsNum={item.comments.length}
                    removeItem={this.addRemoveItem.bind(this)}
                    onItemClick={this.onItemClick.bind(this)}
                />
            )
        }


        if (actItem !== undefined){
            for(let i = 0; i < actItem.comments.length; i++){

                let commentText = actItem.comments[i];

                commentsArr.push(
                    <Comment
                        key={`comment-${i}`}
                        index={i}
                        commentText={commentText}
                    />
                )
            }
        }



        return(
            <div className={'main-content'}>
                <section className={'items-section'}>
                    <h3>Items</h3>
                    <div className={'input-row'}>
                        <input placeholder={'Type name here...'}
                               onChange={this.onInputChange.bind(this, 'item')}
                               value={this.state.inputVal}
                        />
                        <button
                            className={'add-btn'}
                            onClick={this.addRemoveItem.bind(this)}
                        >Add new</button>
                    </div>

                    <div className={'items-list'}>
                    <span className={'active-flag'}
                          style={{
                              top: this.state.actItemIndex * 53 + 'px',
                              display: this.state.itemsArr.length ? 'flex' : 'none'
                          }}
                    />
                        {items}
                    </div>


                </section>
                <section className={'comments-section'}>
                    <div className={'comments-list'}>
                        <h3>{'Comments #' + (this.state.actItemIndex + 1)}</h3>
                        {commentsArr}
                    </div>
                    <div className={'add-comment-row'}>
                        <span className={'avatar-ph'} />
                        <input
                            value={this.state.commentInputVal}
                            onChange={this.onInputChange.bind(this, 'comment')}
                        />
                    </div>
                </section>
            </div>
        )
    }
}

export default MainContent;