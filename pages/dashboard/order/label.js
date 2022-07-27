const CetakLabel = (props) => {
  return (
    <div className="w-full" onLoad={window.print()}>
      <div className="p-3 w-full flex flex-col gap-y-2">
        <div className="flex w-full gap-x-3">
          <div className="w-full">
            <p className="text-gray-700 text-sm font-semibold">Produk</p>
            <div className="pt-2">
              <div className="flex text-sm">
                <p className="w-10">Item</p>
                <p className="px-2">:</p>
                <p>Coffee tubruk gajah</p>
              </div>
              <div className="flex text-sm">
                <p className="w-10">Qty</p>
                <p className="px-2">:</p>
                <p>10 items</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-gray-700 text-sm font-semibold">Pembayaran</p>
            <div className="pt-2">
              <div className="flex text-sm">
                <p className="w-12">Total</p>
                <p className="px-2">:</p>
                <p>Rp 100.000</p>
              </div>
              <div className="flex text-sm">
                <p className="w-12">Method</p>
                <p className="px-2">:</p>
                <p>Bank Tranfer : BCA</p>
              </div>
              <div className="flex text-sm">
                <p className="w-12">Status</p>
                <p className="px-2">:</p>
                <p>Success</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-700 text-sm font-semibold">Ekspedisi</p>
        <div className="border-2 rounded-md p-2">
          <div className="flex text-sm">
            <p className="w-16">Berat</p>
            <p className="px-2">:</p>
            <p>10 Kg</p>
          </div>
          <div className="flex text-sm">
            <p className="w-16">Ekspedisi</p>
            <p className="px-2">:</p>
            <p>JNT</p>
          </div>
          <div className="flex text-sm">
            <p className="w-16">Ongkir</p>
            <p className="px-2">:</p>
            <p>Rp 25.000</p>
          </div>
          <div className="flex text-sm">
            <p className="w-16">Penerima</p>
            <p className="px-2">:</p>
            <p>Muhammad Fatah</p>
          </div>
          <div className="flex text-sm">
            <p className="w-16">No. HP</p>
            <p className="px-2">:</p>
            <p>089786567677</p>
          </div>
          <div className="flex text-sm">
            <p className="w-16">Alamat</p>
            <p className="px-2">:</p>
          </div>
          <p className="text-sm">
            Jl. Mawar No.12, Buleleng, Singaraja, Bali, Indonesia
          </p>
        </div>
      </div>
    </div>
  );
};

export default CetakLabel;
