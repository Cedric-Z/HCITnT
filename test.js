/**
 * Created by hanchen on 2017/11/19.
 */
var bulbSwitch = function(n) {
    if(n === 1) return 1;
    if(n === 0) return 0;
    var ans=[];
    var num=0;
    for(var i=0; i<n ; i++){
        ans[i] = true;
    }
    for(var i=2; i<=n ; i++){
        for(var index=i; index<=n ;index=index+i){
            ans[index-1] === true? ans[index-1]=false : ans[index-1]=true;
        }

    }

    for(var i=0; i<n ; i++){
        if(ans[i] === true){
            num++;
        }
    }
    return ans;
};
for(var i=0; i<10; i++){
    console.log(i,bulbSwitch(i));
}