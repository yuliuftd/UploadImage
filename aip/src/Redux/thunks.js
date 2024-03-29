import {loadFavoursInProgress,
        loadFavoursSuccess,
        loadFavoursFailure, 
        createFavour,
        removeFavour,
        acceptFavour,
        addComment,
        endFavour,
        addAward,
        loadAwardsFailure,
        loadAwardsInProgress,
        loadAwardsSuccess,
        createAwardRelation,
        removeAwardRelation,
    } from './action';



// ---------------------load favours-------------------------------
export const LoadFavours =()=>async(dispatch,getState)=>{

    try {
        dispatch(loadFavoursInProgress());
        const response = await fetch('http://localhost:4000/api/favours');
        const favours = await response.json();
    
        dispatch(loadFavoursSuccess(favours));
    } catch (e) {
        dispatch(loadFavoursFailure());
        dispatch(DisplayAlert(e))
    }

}


export const DisplayAlert=text=>()=>{
    alert(text)
}
// -------------------creat favour-------------------------------
export const AddFavoursRequest =favour=>async dispatch=>{
    try {
        const body = JSON.stringify({favour})
        const response = await fetch('http://localhost:4000/api/favours',{
            headers:{
            'Content-Type':'Application/json',
            },
            method:'post',
            body,
        });
        const favourItem = await response.json();
        dispatch(createFavour(favourItem));
    } catch (e) {
        dispatch(DisplayAlert(e))
    }

}
// ------------------remove favour-------------------------------
export const RemoveFavoursRequest = favour =>async dispatch=>{
    try {
        const response = await fetch(`http://localhost:4000/api/favours/${favour._id}`,{
            method:'delete',
        })
        const restFavour = await response.json();
        dispatch(removeFavour(restFavour));
    } catch (e) {
        dispatch(DisplayAlert(e))
    }
}
// ------------accept favour------------------------------
export const AcceptFavourRequest = favour =>async dispatch =>{
    let receiver = localStorage.username;
    if(receiver===''){
        alert('Please login fisrt')
    }
    else{
        try {
            const response = await fetch(`http://localhost:4000/api/favours/${favour._id}/${receiver}/accepted`,{
                method:'post',
            })
            const updatedFavour = await response.json();
            if(!updatedFavour){
                alert('This favour is no longer valid!')
            }
            dispatch(acceptFavour(updatedFavour));
        } catch (e) {
            dispatch(DisplayAlert(e))
        }
    }
}

// -----------------------AddAward Request------------------------------------------------
export const AddAwardRequest = favour =>async dispatch =>{
    let receiver = localStorage.username;
    if(receiver===''){
        alert('Please login fisrt')
    }
    else{
        try {
            const body = JSON.stringify(favour);
            const response = await fetch(`http://localhost:4000/api/favours/${favour.favourID}/awardIncrement`,{
                headers:{
                'Content-Type':'Application/json',
                },
                method:'post',
                body,
            });
            const awardItem = await response.json();
            if(!awardItem){
                alert('This favour is no longer valid!')
            }
            dispatch(addAward(awardItem));
        } catch (e) {
            dispatch(DisplayAlert(e))
        }
    }
}



// --------------Prove request(picture should be checked before approval)
export const ProveFavourRequest = favour=>async dispatch=>{
    alert("Proved")
}
// ------------------------comments thunk--------------------------

export const AddCommentRequest =comment=>async dispatch=>{
    try {
        const body = JSON.stringify({comment})
        const response = await fetch(`http://localhost:4000/api/comment/${comment.favourID}`,{
            headers:{
            'Content-Type':'Application/json',
            },
            method:'post',
            body,
        });
        const commentItem = await response.json();
        if(commentItem===''){
            alert("This favour is no longer valid!")
        }
        dispatch(addComment(commentItem));
    } catch (e) {
        dispatch(DisplayAlert(e))
    }

}
// --------------------------submit provement-----------------------------------
export const SubmitProveRequest = awardRelation =>async dispatch=>{
    try {
        const body = JSON.stringify(awardRelation);
        const response = await fetch(`http://localhost:4000/api/newAwardRelation`,{
            headers:{
                'Content-Type':'Application/json',
                },
                method:'post',
                body,
        })
        const result = await response.json();
        if (result){
            alert("Successfully proved")
            dispatch(endFavour(result));
        }
    } catch (e) {
        dispatch(DisplayAlert(e))
    }
}
// --------------Submit award record----------------------------------------------------------------
export const SubmitAwardRecord = awardInfo =>async dispatch=>{
    try {
        const body = JSON.stringify(awardInfo);
        const response = await fetch(`http://localhost:4000/api/newAwardRelation`,{
            headers:{
                'Content-Type':'Application/json',
                },
                method:'post',
                body,
        })
        const result = await response.json();
        if (result){
            alert("Successfully recorded");
            dispatch(createAwardRelation(result));
        }

        dispatch(endFavour(result));
    } catch (e) {
        dispatch(DisplayAlert(e))
    }
}

// ---------------Load award relation---------------------------------------------
export const LoadAwards =()=>async(dispatch,getState)=>{

    try {
        dispatch(loadAwardsInProgress());
        const response = await fetch('http://localhost:4000/api/awards');
        const awards = await response.json();
    
        dispatch(loadAwardsSuccess(awards));
    } catch (e) {
        dispatch(loadAwardsFailure());
        dispatch(DisplayAlert(e))
    }

}

// --------------Delete award relation------------------------------------------------
export const RemoveAwardRequest = award => async dispatch=>{
    try {
        const response = await fetch(`http://localhost:4000/api/awards/${award._id}`,{
            method:'delete',
        })
        const restAwards = await response.json();
        dispatch(removeAwardRelation(restAwards));
    } catch (e) {
        dispatch(DisplayAlert(e))
    }
}
