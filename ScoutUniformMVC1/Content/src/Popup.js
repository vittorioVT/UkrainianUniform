"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Popup extends React.Component {
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
    closePopup() {
        this.props.handlerFromParent(false, false);
    }
    render() {
        var total = 0;
        var totalMsg = '';
        let myCart = this.props.myOrder || [];
        var myItems = myCart.map(function (menu) {
            total += menu.Price * menu.Quantity;
            return (React.createElement("div", { key: menu.Id },
                menu.Name,
                ", \u043A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C: ",
                menu.Quantity));
        }, this);
        return (React.createElement("div", { className: 'popup' },
            React.createElement("div", { className: 'popup_inner' },
                React.createElement("div", { style: { height: '35px', fontSize: '18' } },
                    React.createElement("b", null, "\u0417\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0432 \u043E\u043D\u043B\u0430\u0439\u043D-\u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0456 \"\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u041E\u0434\u043D\u043E\u0441\u0442\u0440\u0456\u0439\""),
                    React.createElement("hr", null)),
                React.createElement("div", { className: 'foodList' }, myItems),
                React.createElement("div", { style: { height: '35px' } },
                    React.createElement("hr", null),
                    "\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0430 \u0441\u0443\u043C\u0430 = $",
                    (Math.round(total * 100) / 100).toFixed(2)),
                React.createElement("div", { style: { height: '25px' } }, "\u041F\u043E\u0434\u0430\u0442\u043A\u0438 = 0"),
                React.createElement("div", { className: 'grandSum' },
                    "\u0421\u0443\u043C\u0430 \u0434\u043E \u0441\u043F\u043B\u0430\u0442\u0438: $",
                    (Math.round(total * 100) / 100).toFixed(2)),
                React.createElement("div", { className: 'payment' }),
                React.createElement("div", { className: 'delivEstimate' }),
                React.createElement("div", { style: { bottom: '11px' } },
                    React.createElement("button", { className: "greenBtn a_left", onClick: this.placeOrder }, "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438 \u0417\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F"),
                    React.createElement("button", { className: "greenBtn a_right", onClick: this.closePopup }, "\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438\u0441\u044F")))));
    }
}
exports.Popup = Popup;
//# sourceMappingURL=Popup.js.map