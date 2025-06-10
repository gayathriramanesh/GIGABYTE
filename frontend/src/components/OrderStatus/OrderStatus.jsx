import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

const OrderStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const success = state?.success;
  const order = state?.order;

  const handleReturnHome = () => {
    navigate("/home");
  };

  return (
    <Card style={{ margin: "50px auto", maxWidth: "600px" }}>
      <CardContent style={{ textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          {success ? "🎉 Order Successful!" : "❌ Order Failed"}
        </Typography>
        {success && order ? (
          <>
            <Typography variant="body1">Order ID: {order.order_id}</Typography>
            <Typography variant="body2" style={{ marginTop: "10px" }}>
              Thank you for your purchase!
            </Typography>
          </>
        ) : (
          <Typography variant="body1">
            Something went wrong while processing your order. Please try again.
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={handleReturnHome}
        >
          Return to Home
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderStatus;
