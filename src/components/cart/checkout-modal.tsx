import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "../ui/spinner";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { checkoutI } from "../../../types/cart.type";
import { cashCheckOut } from "@/actions/checkout.action";
import { CartContext } from "@/provider/cart-provider";
export function CheckoutModal() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { cartId, getCartData } = useContext(CartContext);
  const form = useForm({
    defaultValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
        postalCode: "",
      },
    },
  });

  async function handlePayment(data: checkoutI) {
    // console.log(data);
    try {
      setIsLoading(true);
      const response = await cashCheckOut(data, cartId);
      console.log(response);
      if (response.status === "success") {
        getCartData();
        router.push("/products")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-full bg-black text-white hover:bg-black/90 h-12 rounded-md cursor-pointer">
            Proceed to Checkout
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Payment</DialogTitle>
            <DialogDescription>
              Please Fill This Form inorder to Checkout
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(handlePayment)}
            className="space-y-3.5"
          >
            <Controller
              name="shippingAddress.details"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Details</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Details"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="shippingAddress.phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Phone"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="shippingAddress.city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>city</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter city"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="shippingAddress.postalCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>PostalCode</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter PostalCode"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button className="w-full my-3">
              {isLoading ? <Spinner /> : "Checkout"}
            </Button>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
