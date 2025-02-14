import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  orderDetails:any;
 
  constructor(private firestore:AngularFirestore, private service:OrderService) { }

  ngOnInit() {
   

  }
  trackOrder(formData:NgForm){
    var from;
    var to;

    var docRef = this.firestore.collection('orders').doc(formData.value.orderNumberInput);

    docRef.get().toPromise().then((doc)=>{
      if(doc.exists){
        this.orderDetails = {...doc.data()};
        console.log(doc.data());
        console.log(this.orderDetails);
        document.getElementById('name').innerText = doc.data().name;
        document.getElementById('from').innerText = doc.data().from;
        document.getElementById('to').innerText = doc.data().to;
        document.getElementById('tier').innerText = doc.data().tierOption;
      }
      else{
        console.log("does not exist");
      }
    }).catch(function(error){
      console.log("errrrrr",error);
    });
  }
}
