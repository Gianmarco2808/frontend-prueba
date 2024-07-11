import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateAvailability } from "../services/ProductService"
import { ProductDtails } from "../components/ProductDtails"
import { Product } from "../types"

export const loader = async () => {
    const products = await getProducts()
    return products
}

export const action = async ({request}: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData())
  await updateAvailability(+data.id)
  return {}
}

export const Products = () => {

  const products = useLoaderData() as Product[]

  return (
    <>
        <div className="flex justify-between">
          <h2 className="text-4xl font-black text-slate-500">Productos</h2>
          <Link 
            to='productos/nuevo'
            className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          >
              Agregar producto
          </Link>
        </div>

        <div className="p-2">
            <table className="w-full mt-5 table-auto">
              <thead className="bg-slate-800 text-white">
                  <tr>
                      <th className="p-2">Producto</th>
                      <th className="p-2">Precio</th>
                      <th className="p-2">Disponibilidad</th>
                      <th className="p-2">Acciones</th>
                  </tr>
              </thead>
              <tbody>
                  {products.map( product => (
                    <ProductDtails
                        key={product.id}
                        product={product}
                    />
                  ))}
              </tbody>
            </table>
        </div>
    </>
  )
}
