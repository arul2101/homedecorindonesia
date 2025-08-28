import Link from "next/link";

export default function DropdownMenu({ items }) {
  return (
    <>
      {items?.map((item, index) => (
        <div key={index} className="z-[9999] absolute top-8 left-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg h-[480px]">
          <ul>
            <li><Link href={item.href}>{item.name}</Link></li>
          </ul>
        </div>
      ))}
    </>
  )
}
