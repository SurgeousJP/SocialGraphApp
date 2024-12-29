const Home = () => {
  return (
    <div className="overflow-y-hidden">
      <header className="bg-pink-500 sticky top-0 flex justify-between p-4 items-center border-box h-[72px]">
        <div className="flex flex-row space-x-4 items-center">
          <img
            className="w-8 h-8 object-contain rounded-full"
            src="https://i.pinimg.com/736x/cd/0e/0d/cd0e0dbb19f35e33bb6e68b4f47d0db8.jpg"
          />
          <div className="flex space-x-2 items-center rounded-xl p-2 bg-white">
            <input className="focus:outline-none" placeholder="Search users" />
            <img
              className="w-4 h-4"
              src="https://www.svgrepo.com/show/7109/search.svg"
            />
          </div>
        </div>

        <img
          className="w-8 h-8 object-contain rounded-full"
          src="https://i.pinimg.com/736x/cd/0e/0d/cd0e0dbb19f35e33bb6e68b4f47d0db8.jpg"
        />
      </header>
      <body className="bg-slate-800 flex flex-row overflow-hidden">
        <section id='options' className="bg-cyan-500 basis-1/4">
          Options sidebar
        </section>
        <section id='content' className="basis-1/2 overflow-y-auto">
          This is body view Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like). Where
          does it come from? Contrary to popular belief, Lorem Ipsum is not
          simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. The standard chunk of
          Lorem Ipsum used since the 1500s is reproduced below for those
          interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
          Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H.
          Rackham. This book is a treatise on the theory of ethics, very popular
          during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum
          dolor sit amet..", comes from a line in section 1.10.32. The standard
          chunk of Lorem Ipsum used since the 1500s is reproduced below for
          those interested. Sections 1.10.32 and 1.10.33 from "de Finibus
          Bonorum et Malorum" by Cicero are also reproduced in their exact
          original form, accompanied by English versions from the 1914
          translation by H. Rackham. This book is a treatise on the theory of
          ethics, very popular during the Renaissance. The first line of Lorem
          Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
          1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
          reproduced below for those interested. Sections 1.10.32 and 1.10.33
          from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
          their exact original form, accompanied by English versions from the
          1914 translation by H. Rackham.
        </section>
        <section id='options' className="bg-cyan-500 basis-1/4">
          Options sidebar
        </section>
      </body>
    </div>
  );
};

export default Home;
