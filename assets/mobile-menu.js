(function () {
	function closeMenu(toggle) {
		if (!toggle) {
			return;
		}

		toggle.classList.remove('elementor-active');
		toggle.setAttribute('aria-expanded', 'false');

		var dropdown = toggle.nextElementSibling;
		if (dropdown && dropdown.classList.contains('elementor-nav-menu__container')) {
			dropdown.setAttribute('aria-hidden', 'true');
		}
	}

	function toggleMenu(toggle) {
		var isOpen = toggle.classList.toggle('elementor-active');
		toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

		var dropdown = toggle.nextElementSibling;
		if (dropdown && dropdown.classList.contains('elementor-nav-menu__container')) {
			dropdown.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
		}
	}

	function initMobileMenu() {
		document.querySelectorAll('.elementor-menu-toggle').forEach(function (toggle) {
			if (toggle.dataset.menuBound === 'true') {
				return;
			}

			toggle.dataset.menuBound = 'true';

			toggle.addEventListener('click', function () {
				toggleMenu(toggle);
			});

			toggle.addEventListener('keydown', function (event) {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					toggleMenu(toggle);
				}
			});
		});

		document.querySelectorAll('.elementor-nav-menu--dropdown .elementor-item').forEach(function (link) {
			link.addEventListener('click', function () {
				var widget = link.closest('.elementor-widget-nav-menu');
				if (!widget) {
					return;
				}

				closeMenu(widget.querySelector('.elementor-menu-toggle'));
			});
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initMobileMenu);
	} else {
		initMobileMenu();
	}
})();
