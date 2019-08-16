import * as React from "react";
import * as ReactDOM from "react-dom";
import { ProductModel } from "./Models"; 

export class Popup extends React.Component<any, any> {	
	constructor(state) {
        super(state);
		this.state = { items: null, myOrder: null, showPopup: false, userId: 0, orderPlaced: false }; 
		 this.placeOrder = this.placeOrder.bind(this);
		 this.closePopup = this.closePopup.bind(this);
    }

	placeOrder() {
        
		var xhr = new XMLHttpRequest();
		xhr.open('post', "/data/PlaceOrder/" + this.props.userId, true);
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.onreadystatechange = function () { 
			 if (xhr.readyState == 4 && xhr.status == 200) {
				 this.props.handlerFromParent(false, true);
			}
		}.bind(this);
		xhr.send(JSON.stringify(this.props.myOrder));
	}

	closePopup(){     
			this.props.handlerFromParent(false, false);
		 }
 
	render() {

		var total = 0;
		var totalMsg = '';
		let myCart=this.props.myOrder || [];
		
		var myItems = myCart.map(function (menu) {

		    total += menu.Price * menu.Quantity;
		    return (
			    <div key={menu.Id }>
				    {menu.Name}, кількість: {menu.Quantity} 
			    </div>
		    );
	    }, this);
        
		return (
          <div className='popup'>
            <div className='popup_inner'>
              <div style={{height:'35px', fontSize:'18'}}>              
                        <b>Замовлення в онлайн-магазині "Правильний Однострій"</b><hr />
              </div>

              <div className='foodList'>{myItems}</div>

              <div style={{ height: '35px'}}>                  
                    <hr />Загальна сума = ${(Math.round(total * 100) / 100).toFixed(2) } 
              </div>
              <div style={{ height: '25px' }}>
                        Податки = 0
              </div>

              <div className='grandSum'>
                   Сума до сплати: ${(Math.round(total  * 100) / 100).toFixed(2) } 
              </div>
                    
              <div className='payment'></div>
              <div className='delivEstimate'></div>
              
              <div style={{bottom:'11px'}}>
                <button className="greenBtn a_left" onClick={this.placeOrder}>Підтвердити Замовлення</button>
                <button className="greenBtn a_right"onClick={this.closePopup}>Повернутися</button>
              </div>

            </div>
          </div>
      );
}
}