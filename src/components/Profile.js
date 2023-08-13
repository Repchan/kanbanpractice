import React from 'react'

class Profile extends React.Component {
    state={
        clicked:false
    }
    handleClick(){
        if(this.state.clicked){
            this.setState({
                clicked:false
            })
        }
        else{
            this.setState({
                clicked:true
            })
        }
    }
    render() {
        return(
            <div className={'profile'}>
                <img src={'/images/user-avatar.svg'} className={'avatarImg'} alt={'avatar'}/>
                <a href={'#'} className={'arrowLink'} onClick={()=>this.handleClick()}><img src={'/images/arrow-down.svg'} alt={'arrow'}/></a>
                {this.state.clicked ? <div className={'menu'}><a href={'#'}>Profile</a><a href={'#'}>Log Out</a></div> : null}
            </div>
        )
    }
}
export default Profile