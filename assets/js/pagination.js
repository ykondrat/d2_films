const Pagination = {
    code: '',
    Extend: function (data) {
        data = data || {};
        Pagination.size = data.size || 300;
        Pagination.page = data.page || 1;
        Pagination.step = data.step || 3;
    },
    Add: function (s, f) {
        for (let i = s; i < f; i++) {
            Pagination.code += `<li class="waves-effect"><a>${i}</a></li>`;
        }
    },
    Last: function () {
        Pagination.code += `<li class="waves-effect"><i>...</i></li><li class="waves-effect"><a>${Pagination.size}</a></li>`;
    },
    First: function () {
        Pagination.code += '<li class="waves-effect"><a>1</a></li><li class="waves-effect"><i>...</i></li>';
    },
    Click: function () {
        state.page = +this.innerHTML;
        Pagination.page = +this.innerHTML;
        Pagination.Start();
        console.log(state.page, +this.innerHTML);
    },
    Prev: function () {
        Pagination.page--;
        if (Pagination.page < 1) {
            Pagination.page = 1;
        }
        state.page = Pagination.page;
        Pagination.Start();
    },
    Next: function() {
        Pagination.page++;
        if (Pagination.page > Pagination.size) {
            Pagination.page = Pagination.size;
        }
        state.page = Pagination.page;
        Pagination.Start();
    },
    Bind: function () {
        const a = Pagination.e.getElementsByTagName('a');
        for (let i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page) {
                a[i].parentElement.className = 'active z-depth-3';
            }
            a[i].addEventListener('click', Pagination.Click, false);
        }
    },
    Finish: function() {
        Pagination.e.innerHTML = Pagination.code;
        Pagination.code = '';
        Pagination.Bind();
    },
    Start: function() {
        if (Pagination.size < Pagination.step * 2 + 6) {
            Pagination.Add(1, Pagination.size + 1);
        } else if (Pagination.page < Pagination.step * 2 + 1) {
            Pagination.Add(1, Pagination.step * 2 + 4);
            Pagination.Last();
        } else if (Pagination.page > Pagination.size - Pagination.step * 2) {
            Pagination.First();
            Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
        } else {
            Pagination.First();
            Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
            Pagination.Last();
        }
        Pagination.Finish();
    },
    Buttons: function (e) {
        const nav = e.getElementsByTagName('li');

        nav[0].addEventListener('click', Pagination.Prev, false);
        nav[1].addEventListener('click', Pagination.Next, false);
    },
    Create: function(e) {
        const html = [
            `<li class="waves-effect"><i class="material-icons">chevron_left</i></li>`,
            '<span></span>',
            `<li class="waves-effect"><i class="material-icons">chevron_right</i></li>`
        ];

        e.innerHTML = html.join('');
        Pagination.e = e.getElementsByTagName('span')[0];
        Pagination.Buttons(e);
    },
    Init: function(e, data) {
        Pagination.Extend(data);
        Pagination.Create(e, data);
        Pagination.Start();
    }
};
