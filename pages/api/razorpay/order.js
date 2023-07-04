import Razorpay from  'razorpay';
export default function handler(req, res) {
  if (req.method === 'POST') {
      let instance = new Razorpay({ key_id: 'rzp_test_LWbOWLWKn6A8wz', key_secret: '2FRzsXSZFVKItDYJK0E7rgpH' })

          var options = {
            amount: req.body.amount *100,  // amount in the smallest currency unit
            currency: "INR",
          };
          instance.orders.create(options, function(err, order) {
            if(err){
                console.log(err);
                if(err.statusCode===undefined){
                    console.log("order",order);
                }
                res.status(400).json({ message:err })
                  return;
            }
            res.status(200).json({ message:order })
            });
     }
    }