import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-share-snippet',
  templateUrl: './share-snippet.component.html',
  styleUrls: ['./share-snippet.component.scss']
})
export class ShareSnippetComponent implements OnInit, OnDestroy {
  // chip list config
  chipSelectable = true;
  chipRemovable = true;
  chipAddOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // current code snippet attributes
  avatarUrl: string;

  // shared users
  public availableUsers: User[];

  private subUsers: Subscription = new Subscription();
  public fgSettings: FormGroup;

  // refs
  @ViewChild('sharedUsersInput') sharedUsersInput: ElementRef;

  // input/output
  @Input() selectedUsers: User[] = [];
  @Input() public: boolean;
  @Input() tags: string[] = [];

  @Output() onSharedUsersChanged: EventEmitter<User[]> = new EventEmitter<User[]>();
  @Output() onTagsChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() onPublicStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.fgSettings = this.formBuilder.group({
      public: [this.public, Validators.required],
      sharedUsers: [null],
      tags: [this.tags]
    });

    this.avatarUrl = userService.getApiUrl() + '/avatar/';
  }

  ngOnDestroy(): void {
    this.fgSettings.patchValue({public: this.public})
    this.subUsers.unsubscribe();
  }

  ngOnInit(): void {
    this.fgSettings.patchValue({public: this.public})
    this.loadAllUsers();
  }

  /**
   * adds from autocomplete selected user to sharedUsers list
   * @param $event
   */
  addUserToSelectedList($event: User) {
    // add to selected users
    this.selectedUsers.push($event)

    // unfocus input and reset value
    this.sharedUsersInput.nativeElement.value = '';
    this.sharedUsersInput.nativeElement.blur();

    // remove user from uer list
    const index = this.availableUsers.findIndex((u) => {
      return u.id === $event.id;
    });

    this.availableUsers.splice(index, 1);
    this.onSharedUsersChanged.emit(this.selectedUsers);
  }

  /**
   * Loads all Users available in DB to select users to share
   * @private
   */
  private loadAllUsers() {
    this.subUsers = this.userService.loadAllUsers().subscribe((users: User[]) => {
      this.availableUsers = users;
    });
  }

  /**
   * set all available users and mark code snippet as public
   * @param checked
   */
  setAllUsers(checked: boolean) {
    if (checked === true) {
      this.loadAllUsers();
    }

    this.public = checked;
    this.onPublicStatusChange.emit(this.public);
  }

  /**
   * Add a chip to chipList depending on type
   * @param event: the chip object
   * @param type: tag | user will separate the chip lists
   */
  addChip(event: MatChipInputEvent, type: string): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.onTagsChanged.emit(this.tags.toString());
  }

  /**
   * Remove a chip from a chips list
   * @param chip: ship object
   * @param type: tag | user will separate the chip lists
   */
  removeChip(chip: string, type: string): void {
    let index;
    index = this.tags.indexOf(chip);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    this.onTagsChanged.emit(this.tags.toString());
  }

  /**
   * Remove user from selected users list and add back to available users
   * @param user to remove
   */
  removeUser(user: User) {
    const index = this.selectedUsers.findIndex((u) => {
      return u.id === user.id;
    });

    this.selectedUsers.splice(index, 1);

    // add user back to available users
    this.availableUsers.push(user);

    this.onSharedUsersChanged.emit(this.selectedUsers);
  }
}
