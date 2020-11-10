unlayer.registerPropertyEditor({
    name: 'dynamic_tags',
    Widget: unlayer.createWidget({
        render(value, updateValue, data) {
            let menu = '';
            for (let tagCategory of tags) {
                menu += `<div class="dropdown">
                          <button class="btn btn-default dropdown-toggle" type="button" id="dropdown${tagCategory.text}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            ${tagCategory.text}
                            <span class="caret"></span>
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdown${tagCategory.text}">
                            ${tagCategory.menu.map(tag => {
                                return `<li><a href="#" class="dynamic-tag-select" data-content="${tag.content}">${tag.text}</a></li>`;
                            })}
                          </ul>
                        </div>`;
            }
            return menu;
        },
        mount(node, value, updateValue, data) {
            $(document).on('click', 'dynamic-tag-select', function () {
                console.log($(this).data('content'), $(this));
            });
        }
    })
});