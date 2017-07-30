var list = $('.list')[0];
var state = false;
func();
function func(){
	var lis = $('li',list);
	var downs = $('.down',list);
	var ups = $('.up',list);
	for(var i = 0; i < downs.length; i++){
		lis[i].style.top = i*62 + 'px';
		lis[i].index = i;
		downs[i].index = i;
		downs[i].onclick = function (){
			var liOffsetTop = lis[this.index].offsetTop;
			var thisLi = this.parentNode.parentNode;
			var nextLi = lis[this.index].nextElementSibling;
			var thisIndex = this.index;
			if(state){
				return;
			}
			state = true;
			if(thisIndex === (lis.length - 1)){
				for(var i = 0; i < lis.length - 1; i++){
					mTween(lis[i],{top: (i+1)*62},500);
				}
				mTween(thisLi,{
					top: 0
				},500,'linear',function (){
					list.insertBefore(thisLi,list.firstElementChild);
					state = false;
					func();
				});
				
				return;
			}
			mTween(thisLi,{
				top: liOffsetTop + 62
			},500,'linear',function (){
				list.insertBefore(nextLi,thisLi);
				state = false;
				func();
			});
			mTween(nextLi,{
				top: liOffsetTop
			},500)
			
		}
		
		ups[i].index = i;
		ups[i].onclick = function (){
			var liOffsetTop = lis[this.index].offsetTop;
			var thisLi = this.parentNode.parentNode;
			var prevLi = lis[this.index].previousElementSibling;
			var thisIndex = this.index;
			if(state){
				return;
			}
			state = true;
			if(thisIndex === 0){
				for(var j = 1; j < lis.length; j++){
					mTween(lis[j],{top: (j-1)*62},500);
				}
				mTween(thisLi,{
					top: (i-1)*62
				},500,'linear',function (){
					list.appendChild(thisLi);
					state = false;
					func();
				});
				
				return;
			}
			mTween(thisLi,{
				top: liOffsetTop - 62
			},500,'linear',function (){
				list.insertBefore(thisLi,prevLi);
				state = false;
				func();
			});
			mTween(prevLi,{
				top: liOffsetTop
			},500)
			
		}
	}
}














